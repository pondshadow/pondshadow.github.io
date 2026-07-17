precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 outColor;

const int MAX_STEPS = 92;
const float MAX_DISTANCE = 32.0;
const float EPSILON = 0.0018;

float sdBox(vec3 point, vec3 bounds) {
  vec3 q = abs(point) - bounds;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdTorusZ(vec3 point, vec2 radii) {
  vec2 q = vec2(length(point.xy) - radii.x, point.z);
  return length(q) - radii.y;
}

vec2 mapScene(vec3 point) {
  vec3 repeated = point;
  repeated.z = mod(point.z + 1.5, 3.0) - 1.5;

  float ring = sdTorusZ(repeated, vec2(1.92, 0.09));
  float pillarA = sdBox(vec3(abs(point.x) - 1.62, point.y + 0.15, repeated.z), vec3(0.13, 1.28, 0.13));
  float pillarB = sdBox(vec3(point.x, abs(point.y) - 1.36, repeated.z), vec3(1.66, 0.09, 0.12));
  float architecture = min(ring, min(pillarA, pillarB));

  vec3 crystalPoint = repeated - vec3(0.0, 0.0, 0.15);
  crystalPoint.xy *= mat2(cos(u_time * 0.5), -sin(u_time * 0.5), sin(u_time * 0.5), cos(u_time * 0.5));
  float crystal = sdBox(crystalPoint, vec3(0.18, 0.18, 0.18));

  if (crystal < architecture) return vec2(crystal, 2.0);
  return vec2(architecture, 1.0);
}

vec3 getNormal(vec3 point) {
  vec2 e = vec2(EPSILON, 0.0);
  return normalize(vec3(
    mapScene(point + e.xyy).x - mapScene(point - e.xyy).x,
    mapScene(point + e.yxy).x - mapScene(point - e.yxy).x,
    mapScene(point + e.yyx).x - mapScene(point - e.yyx).x
  ));
}

vec3 cameraRay(vec2 uv, vec3 origin, vec3 target) {
  vec3 forward = normalize(target - origin);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  return normalize(forward + uv.x * right + uv.y * up);
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 mouse = u_mouse / resolution - 0.5;

  vec3 origin = vec3(mouse.x * 0.75, mouse.y * 0.6, u_time * 1.15);
  vec3 target = origin + vec3(mouse.x * 0.35, mouse.y * 0.2, 2.5);
  vec3 direction = cameraRay(uv * 0.74, origin, target);

  float travel = 0.0;
  float material = 0.0;
  float glow = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 point = origin + direction * travel;
    vec2 scene = mapScene(point);
    glow += 0.012 / (0.025 + abs(scene.x));
    travel += scene.x * 0.82;
    material = scene.y;
    if (abs(scene.x) < EPSILON || travel > MAX_DISTANCE) break;
  }

  vec3 color = mix(vec3(0.008, 0.012, 0.026), vec3(0.025, 0.02, 0.07), uv.y * 0.5 + 0.5);
  color += vec3(0.05, 0.12, 0.3) * min(glow * 0.018, 0.42);

  if (travel < MAX_DISTANCE) {
    vec3 point = origin + direction * travel;
    vec3 normal = getNormal(point);
    vec3 viewDirection = -direction;
    vec3 lightDirection = normalize(vec3(0.4, 0.7, -0.5));
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float specular = pow(max(dot(reflect(-lightDirection, normal), viewDirection), 0.0), 54.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.2);

    if (material < 1.5) {
      color = vec3(0.055, 0.08, 0.17) * (0.3 + diffuse * 0.9);
      color += fresnel * vec3(0.08, 0.5, 1.0);
      color += specular * vec3(0.5, 0.8, 1.0);
    } else {
      color = vec3(0.95, 0.18, 0.48) * (0.65 + diffuse);
      color += fresnel * vec3(0.25, 0.75, 1.0) + specular;
    }

    float fog = 1.0 - exp(-travel * 0.055);
    color = mix(color, vec3(0.008, 0.012, 0.026), fog);
  }

  color += vec3(0.03, 0.14, 0.34) * max(glow - 0.55, 0.0) * 0.045;
  outColor = vec4(pow(color, vec3(0.82)), 1.0);
}
