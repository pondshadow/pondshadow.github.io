precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 outColor;

const int MAX_STEPS = 88;
const float MAX_DISTANCE = 22.0;
const float EPSILON = 0.0018;

float smoothMinimum(float a, float b, float smoothing) {
  float h = clamp(0.5 + 0.5 * (b - a) / smoothing, 0.0, 1.0);
  return mix(b, a, h) - smoothing * h * (1.0 - h);
}

float organicForm(vec3 point) {
  float time = u_time * 0.72;
  float distanceField = 100.0;

  for (int i = 0; i < 6; i++) {
    float index = float(i);
    vec3 center = vec3(
      sin(time * (0.58 + index * 0.025) + index * 2.1),
      cos(time * (0.43 + index * 0.031) + index * 1.7) * 0.62,
      cos(time * (0.51 + index * 0.019) + index * 2.6)
    );
    center *= vec3(0.92, 0.75, 0.78);
    float radius = 0.48 + 0.1 * sin(time + index * 1.3);
    float sphere = length(point - center) - radius;
    distanceField = smoothMinimum(distanceField, sphere, 0.48);
  }

  return distanceField;
}

vec2 mapScene(vec3 point) {
  float form = organicForm(point - vec3(0.0, 0.05, 0.0));
  float floorDistance = point.y + 1.38;
  return floorDistance < form ? vec2(floorDistance, 2.0) : vec2(form, 1.0);
}

vec2 rayMarch(vec3 origin, vec3 direction) {
  float travel = 0.0;
  float material = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec2 scene = mapScene(origin + direction * travel);
    travel += scene.x;
    material = scene.y;
    if (abs(scene.x) < EPSILON || travel > MAX_DISTANCE) break;
  }

  return vec2(travel, material);
}

vec3 getNormal(vec3 point) {
  vec2 e = vec2(EPSILON, 0.0);
  return normalize(vec3(
    mapScene(point + e.xyy).x - mapScene(point - e.xyy).x,
    mapScene(point + e.yxy).x - mapScene(point - e.yxy).x,
    mapScene(point + e.yyx).x - mapScene(point - e.yyx).x
  ));
}

float ambientOcclusion(vec3 point, vec3 normal) {
  float occlusion = 0.0;
  float weight = 1.0;
  for (int i = 1; i <= 5; i++) {
    float distanceStep = 0.055 * float(i);
    occlusion += (distanceStep - mapScene(point + normal * distanceStep).x) * weight;
    weight *= 0.62;
  }
  return clamp(1.0 - occlusion * 2.2, 0.15, 1.0);
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

  float orbit = u_time * 0.07 + mouse.x * 3.6;
  vec3 origin = vec3(sin(orbit) * 4.5, 0.65 + mouse.y * 2.0, cos(orbit) * 4.5);
  vec3 direction = cameraRay(uv * 0.8, origin, vec3(0.0, -0.05, 0.0));
  vec3 color = mix(vec3(0.018, 0.035, 0.052), vec3(0.04, 0.12, 0.14), max(direction.y, 0.0));

  vec2 hit = rayMarch(origin, direction);
  if (hit.x < MAX_DISTANCE) {
    vec3 point = origin + direction * hit.x;
    vec3 normal = getNormal(point);
    vec3 lightDirection = normalize(vec3(-0.6, 0.8, 0.5));
    vec3 viewDirection = normalize(origin - point);
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float backLight = max(dot(normal, -lightDirection), 0.0);
    float specular = pow(max(dot(reflect(-lightDirection, normal), viewDirection), 0.0), 48.0);
    float ao = ambientOcclusion(point, normal);

    if (hit.y < 1.5) {
      vec3 warm = vec3(0.95, 0.22, 0.08);
      vec3 cool = vec3(0.04, 0.64, 0.7);
      vec3 base = mix(warm, cool, normal.y * 0.5 + 0.5);
      color = base * (0.15 + diffuse * 0.85 + backLight * 0.18) * ao;
      color += specular * vec3(1.0, 0.85, 0.5);
      color += pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0) * cool * 0.5;
    } else {
      vec2 tile = floor(point.xz * 1.35);
      float checker = mod(tile.x + tile.y, 2.0);
      vec3 base = mix(vec3(0.035), vec3(0.075), checker);
      color = base * (0.28 + diffuse * 0.65) * ao;
      color += specular * 0.18;
    }

    color = mix(color, vec3(0.018, 0.035, 0.052), 1.0 - exp(-hit.x * 0.06));
  }

  outColor = vec4(pow(color, vec3(0.82)), 1.0);
}
