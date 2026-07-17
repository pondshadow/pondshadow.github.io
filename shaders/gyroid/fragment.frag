precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 outColor;

const int MAX_STEPS = 110;
const float MAX_DISTANCE = 20.0;
const float EPSILON = 0.0015;

mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float gyroid(vec3 point) {
  return dot(sin(point), cos(point.yzx));
}

float mapScene(vec3 point) {
  vec3 q = point;
  q.xz *= rotate2d(u_time * 0.22);
  q.xy *= rotate2d(u_time * 0.13);

  float shell = length(q) - 1.48;
  float structure = abs(gyroid(q * 3.25)) / 3.25 - 0.035;
  return max(structure, shell);
}

vec3 getNormal(vec3 point) {
  vec2 e = vec2(EPSILON, 0.0);
  return normalize(vec3(
    mapScene(point + e.xyy) - mapScene(point - e.xyy),
    mapScene(point + e.yxy) - mapScene(point - e.yxy),
    mapScene(point + e.yyx) - mapScene(point - e.yyx)
  ));
}

float ambientOcclusion(vec3 point, vec3 normal) {
  float occlusion = 0.0;
  float scale = 1.0;
  for (int i = 1; i <= 5; i++) {
    float stepDistance = float(i) * 0.045;
    occlusion += (stepDistance - mapScene(point + normal * stepDistance)) * scale;
    scale *= 0.6;
  }
  return clamp(1.0 - occlusion * 3.0, 0.1, 1.0);
}

vec3 cameraRay(vec2 uv, vec3 origin, vec3 target) {
  vec3 forward = normalize(target - origin);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  return normalize(forward + uv.x * right + uv.y * up);
}

vec3 palette(float value) {
  return 0.52 + 0.48 * cos(6.28318 * (value + vec3(0.0, 0.28, 0.62)));
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 mouse = u_mouse / resolution - 0.5;

  float orbit = u_time * 0.08 + mouse.x * 3.8;
  vec3 origin = vec3(sin(orbit) * 4.2, mouse.y * 2.3, cos(orbit) * 4.2);
  vec3 direction = cameraRay(uv * 0.78, origin, vec3(0.0));
  float travel = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    float distanceToScene = mapScene(origin + direction * travel);
    travel += distanceToScene * 0.68;
    if (abs(distanceToScene) < EPSILON || travel > MAX_DISTANCE) break;
  }

  vec3 color = mix(vec3(0.012, 0.008, 0.025), vec3(0.055, 0.035, 0.09), max(direction.y, 0.0));

  if (travel < MAX_DISTANCE) {
    vec3 point = origin + direction * travel;
    vec3 normal = getNormal(point);
    vec3 viewDirection = normalize(origin - point);
    vec3 lightA = normalize(vec3(0.7, 0.9, 0.4));
    vec3 lightB = normalize(vec3(-0.8, -0.2, 0.5));
    float diffuseA = max(dot(normal, lightA), 0.0);
    float diffuseB = max(dot(normal, lightB), 0.0);
    float specular = pow(max(dot(reflect(-lightA, normal), viewDirection), 0.0), 80.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.0);
    float ao = ambientOcclusion(point, normal);

    vec3 iridescence = palette(normal.y * 0.28 + fresnel * 0.34 + u_time * 0.025);
    color = iridescence * (0.16 + diffuseA * 0.75 + diffuseB * 0.2) * ao;
    color += specular * vec3(1.0, 0.86, 0.7);
    color += fresnel * palette(normal.x * 0.2 + 0.6) * 0.75;
    color = mix(color, vec3(0.018, 0.01, 0.035), 1.0 - exp(-travel * 0.045));
  }

  float vignette = 1.0 - smoothstep(0.45, 1.35, length(uv));
  color *= 0.72 + vignette * 0.28;
  outColor = vec4(pow(color, vec3(0.78)), 1.0);
}
