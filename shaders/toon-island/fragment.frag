precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 outColor;

const int MAX_STEPS = 92;
const float MAX_DISTANCE = 24.0;
const float EPSILON = 0.0016;

mat2 rotate2d(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float sdSphere(vec3 point, float radius) {
  return length(point) - radius;
}

float sdRoundBox(vec3 point, vec3 bounds, float radius) {
  vec3 q = abs(point) - bounds;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - radius;
}

float sdCappedCone(vec3 point, float height, float bottomRadius, float topRadius) {
  vec2 q = vec2(length(point.xz), point.y);
  vec2 k1 = vec2(topRadius, height);
  vec2 k2 = vec2(topRadius - bottomRadius, 2.0 * height);
  vec2 ca = vec2(q.x - min(q.x, q.y < 0.0 ? bottomRadius : topRadius), abs(q.y) - height);
  vec2 cb = q - k1 + k2 * clamp(dot(k1 - q, k2) / dot(k2, k2), 0.0, 1.0);
  float signValue = cb.x < 0.0 && ca.y < 0.0 ? -1.0 : 1.0;
  return signValue * sqrt(min(dot(ca, ca), dot(cb, cb)));
}

float sdEllipsoid(vec3 point, vec3 radius) {
  float k0 = length(point / radius);
  float k1 = length(point / (radius * radius));
  return k0 * (k0 - 1.0) / max(k1, 0.0001);
}

vec2 pickClosest(vec2 current, vec2 candidate) {
  return candidate.x < current.x ? candidate : current;
}

vec2 mapScene(vec3 point) {
  vec2 scene = vec2(100.0, 0.0);

  vec3 islandPoint = point - vec3(0.0, -0.94, 0.0);
  islandPoint.xz *= rotate2d(-0.16);
  float island = sdEllipsoid(islandPoint, vec3(2.65, 0.62, 2.15));
  scene = pickClosest(scene, vec2(island, 1.0));

  vec3 housePoint = point - vec3(0.0, -0.08, 0.0);
  float house = sdRoundBox(housePoint, vec3(0.62, 0.72, 0.54), 0.19);
  scene = pickClosest(scene, vec2(house, 2.0));

  float roof = sdCappedCone(point - vec3(0.0, 1.1, 0.0), 0.78, 1.08, 0.08);
  scene = pickClosest(scene, vec2(roof, 3.0));

  vec3 chimneyPoint = point - vec3(0.42, 1.62, 0.02);
  float chimney = sdRoundBox(chimneyPoint, vec3(0.14, 0.45, 0.14), 0.045);
  scene = pickClosest(scene, vec2(chimney, 4.0));

  for (int i = 0; i < 3; i++) {
    float index = float(i);
    float angle = index * 2.15 + 0.6;
    vec3 treeCenter = vec3(cos(angle) * 1.72, -0.2, sin(angle) * 1.4);
    float trunk = sdCappedCone(point - treeCenter + vec3(0.0, 0.24, 0.0), 0.48, 0.13, 0.09);
    scene = pickClosest(scene, vec2(trunk, 4.0));

    vec3 foliagePoint = point - treeCenter - vec3(0.0, 0.68 + 0.08 * sin(index), 0.0);
    foliagePoint.xz *= rotate2d(index * 1.7);
    float foliage = sdEllipsoid(foliagePoint, vec3(0.5, 0.76, 0.46));
    scene = pickClosest(scene, vec2(foliage, 5.0));
  }

  vec3 mailboxPoint = point - vec3(-1.05, -0.28, 0.7);
  float mailboxPost = sdCappedCone(mailboxPoint + vec3(0.0, 0.28, 0.0), 0.45, 0.055, 0.045);
  float mailbox = sdRoundBox(mailboxPoint - vec3(0.0, 0.42, 0.0), vec3(0.23, 0.16, 0.14), 0.08);
  scene = pickClosest(scene, vec2(mailboxPost, 4.0));
  scene = pickClosest(scene, vec2(mailbox, 6.0));

  return scene;
}

vec3 getNormal(vec3 point) {
  vec2 offset = vec2(EPSILON, 0.0);
  return normalize(vec3(
    mapScene(point + offset.xyy).x - mapScene(point - offset.xyy).x,
    mapScene(point + offset.yxy).x - mapScene(point - offset.yxy).x,
    mapScene(point + offset.yyx).x - mapScene(point - offset.yyx).x
  ));
}

float softShadow(vec3 origin, vec3 direction) {
  float shadow = 1.0;
  float travel = 0.035;

  for (int i = 0; i < 28; i++) {
    float distanceToScene = mapScene(origin + direction * travel).x;
    shadow = min(shadow, 10.0 * distanceToScene / travel);
    travel += clamp(distanceToScene, 0.025, 0.22);
    if (shadow < 0.03 || travel > 7.0) break;
  }

  return clamp(shadow, 0.0, 1.0);
}

float ambientOcclusion(vec3 point, vec3 normal) {
  float occlusion = 0.0;
  float weight = 1.0;

  for (int i = 1; i <= 5; i++) {
    float stepDistance = 0.055 * float(i);
    occlusion += (stepDistance - mapScene(point + normal * stepDistance).x) * weight;
    weight *= 0.58;
  }

  return clamp(1.0 - occlusion * 2.4, 0.22, 1.0);
}

vec3 cameraRay(vec2 uv, vec3 origin, vec3 target) {
  vec3 forward = normalize(target - origin);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  return normalize(forward + uv.x * right + uv.y * up);
}

vec3 materialColor(float material, vec3 point) {
  if (material < 1.5) return mix(vec3(0.16, 0.47, 0.22), vec3(0.36, 0.68, 0.24), point.y + 1.15);
  if (material < 2.5) return vec3(0.97, 0.72, 0.28);
  if (material < 3.5) return vec3(0.91, 0.21, 0.18);
  if (material < 4.5) return vec3(0.32, 0.16, 0.09);
  if (material < 5.5) return vec3(0.09, 0.46, 0.28);
  return vec3(0.22, 0.58, 0.85);
}

float cloudBand(vec2 point, vec2 center, vec2 size) {
  vec2 q = (point - center) / size;
  float left = length(q + vec2(0.48, 0.0));
  float middle = length(q + vec2(0.08, -0.1));
  float right = length(q - vec2(0.38, 0.02));
  return 1.0 - smoothstep(0.75, 1.0, min(left, min(middle, right)));
}

void main() {
  vec2 resolution = max(u_resolution, vec2(1.0));
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 mouse = u_mouse / resolution - 0.5;

  float orbit = 0.32 + sin(u_time * 0.18) * 0.22 + mouse.x * 1.65;
  vec3 origin = vec3(sin(orbit) * 5.5, 2.3 + mouse.y * 1.25, cos(orbit) * 5.5);
  vec3 direction = cameraRay(uv * 0.84, origin, vec3(0.0, -0.18, 0.0));

  vec3 skyBottom = vec3(0.22, 0.61, 0.88);
  vec3 skyTop = vec3(0.72, 0.9, 0.98);
  vec3 color = mix(skyBottom, skyTop, smoothstep(-0.65, 0.7, direction.y));

  vec2 skyUv = vec2(direction.x / max(0.25, direction.z), direction.y);
  float clouds = cloudBand(skyUv, vec2(-0.68 + sin(u_time * 0.025) * 0.08, 0.3), vec2(0.38, 0.08));
  clouds += cloudBand(skyUv, vec2(0.52 + sin(u_time * 0.018) * 0.06, 0.08), vec2(0.52, 0.1));
  color = mix(color, vec3(0.97), clamp(clouds, 0.0, 0.68));

  float travel = 0.0;
  float material = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec2 scene = mapScene(origin + direction * travel);
    travel += scene.x * 0.72;
    material = scene.y;
    if (abs(scene.x) < EPSILON || travel > MAX_DISTANCE) break;
  }

  if (travel < MAX_DISTANCE) {
    vec3 point = origin + direction * travel;
    vec3 normal = getNormal(point);
    vec3 viewDirection = normalize(origin - point);
    vec3 sunDirection = normalize(vec3(-0.6, 0.85, 0.45));
    float diffuse = max(dot(normal, sunDirection), 0.0);
    float shadow = softShadow(point + normal * 0.012, sunDirection);
    float toonLight = floor((diffuse * shadow) * 3.0) / 3.0;
    float ambient = 0.28 + 0.14 * max(normal.y, 0.0);
    float occlusion = ambientOcclusion(point, normal);
    float rim = smoothstep(0.45, 0.9, 1.0 - max(dot(normal, viewDirection), 0.0));
    vec3 base = materialColor(material, point);

    color = base * (ambient + toonLight * 0.82) * occlusion;
    color += rim * vec3(1.0, 0.93, 0.72) * 0.18;
    color = mix(color, vec3(0.11, 0.055, 0.1), smoothstep(0.48, 0.93, 1.0 - max(dot(normal, viewDirection), 0.0)) * 0.62);
    color = mix(color, skyBottom, 1.0 - exp(-travel * 0.065));
  }

  float vignette = 1.0 - smoothstep(0.7, 1.42, length(uv));
  color *= 0.8 + vignette * 0.2;
  outColor = vec4(pow(max(color, 0.0), vec3(0.78)), 1.0);
}
