precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 outColor;

const int MAX_STEPS = 96;
const float MAX_DISTANCE = 24.0;
const float SURFACE_DISTANCE = 0.0015;

mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float sdRoundBox(vec3 point, vec3 bounds, float radius) {
  vec3 q = abs(point) - bounds + radius;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - radius;
}

float sdTorus(vec3 point, vec2 radii) {
  vec2 q = vec2(length(point.xz) - radii.x, point.y);
  return length(q) - radii.y;
}

vec2 mapScene(vec3 point) {
  float floorDistance = point.y + 1.35;

  vec3 q = point - vec3(0.0, 0.05, 0.0);
  q.xz *= rotate2d(u_time * 0.28);
  q.xz *= rotate2d(q.y * 0.34);

  float body = sdRoundBox(q, vec3(0.62, 1.08, 0.45), 0.16);
  float opening = sdTorus(q, vec2(0.31, 0.13));
  float sculpture = max(body, -opening);

  vec3 crownPoint = q - vec3(0.0, 1.18, 0.0);
  float crown = length(crownPoint) - 0.24;
  sculpture = min(sculpture, crown);

  return floorDistance < sculpture
    ? vec2(floorDistance, 2.0)
    : vec2(sculpture, 1.0);
}

vec2 rayMarch(vec3 rayOrigin, vec3 rayDirection) {
  float distanceTravelled = 0.0;
  float material = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 point = rayOrigin + rayDirection * distanceTravelled;
    vec2 scene = mapScene(point);
    distanceTravelled += scene.x;
    material = scene.y;

    if (abs(scene.x) < SURFACE_DISTANCE || distanceTravelled > MAX_DISTANCE) {
      break;
    }
  }

  return vec2(distanceTravelled, material);
}

vec3 getNormal(vec3 point) {
  vec2 epsilon = vec2(0.0015, 0.0);
  float center = mapScene(point).x;
  return normalize(vec3(
    center - mapScene(point - epsilon.xyy).x,
    center - mapScene(point - epsilon.yxy).x,
    center - mapScene(point - epsilon.yyx).x
  ));
}

float softShadow(vec3 origin, vec3 direction) {
  float result = 1.0;
  float travel = 0.03;

  for (int i = 0; i < 30; i++) {
    float distanceToScene = mapScene(origin + direction * travel).x;
    result = min(result, 14.0 * distanceToScene / travel);
    travel += clamp(distanceToScene, 0.02, 0.3);
    if (distanceToScene < 0.001 || travel > 8.0) break;
  }

  return clamp(result, 0.12, 1.0);
}

vec3 getRayDirection(vec2 uv, vec3 origin, vec3 target) {
  vec3 forward = normalize(target - origin);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  return normalize(forward + uv.x * right + uv.y * up);
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 mouse = u_mouse / resolution - 0.5;

  float cameraAngle = u_time * 0.09 + mouse.x * 3.4;
  vec3 rayOrigin = vec3(
    sin(cameraAngle) * 4.3,
    0.75 + mouse.y * 2.2,
    cos(cameraAngle) * 4.3
  );
  vec3 rayDirection = getRayDirection(uv * 0.78, rayOrigin, vec3(0.0, -0.05, 0.0));

  vec3 color = mix(
    vec3(0.035, 0.045, 0.07),
    vec3(0.18, 0.11, 0.24),
    max(rayDirection.y, 0.0)
  );

  vec2 hit = rayMarch(rayOrigin, rayDirection);
  if (hit.x < MAX_DISTANCE) {
    vec3 point = rayOrigin + rayDirection * hit.x;
    vec3 normal = getNormal(point);
    vec3 lightPosition = vec3(3.5, 4.8, 2.5);
    vec3 lightDirection = normalize(lightPosition - point);
    vec3 viewDirection = normalize(rayOrigin - point);
    vec3 halfDirection = normalize(lightDirection + viewDirection);

    float diffuse = max(dot(normal, lightDirection), 0.0);
    float shadow = softShadow(point + normal * 0.01, lightDirection);
    float specular = pow(max(dot(normal, halfDirection), 0.0), 70.0);
    float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.4);

    if (hit.y < 1.5) {
      vec3 base = mix(vec3(0.08, 0.11, 0.16), vec3(0.31, 0.18, 0.52), normal.y * 0.5 + 0.5);
      color = base * (0.18 + diffuse * shadow * 0.9);
      color += specular * vec3(1.0, 0.82, 0.56) * shadow;
      color += rim * vec3(0.24, 0.6, 1.0) * 0.45;
    } else {
      float grid = step(0.96, max(fract(point.x * 0.5), fract(point.z * 0.5)));
      vec3 floorColor = mix(vec3(0.035), vec3(0.12), grid);
      color = floorColor * (0.28 + diffuse * shadow * 0.65);
    }

    color = mix(color, vec3(0.055, 0.045, 0.08), 1.0 - exp(-hit.x * 0.055));
  }

  color = pow(color, vec3(0.82));
  outColor = vec4(color, 1.0);
}
