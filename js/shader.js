import GlslCanvas from 'https://cdn.skypack.dev/pin/glslCanvas@v0.2.6-vKgxQPoe1RYCF7bo1o1i/mode=imports/optimized/glslCanvas.js';

const canvas = document.getElementById("glslCanvas");
const sandbox = new GlslCanvas(canvas);

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
// 1. The #version MUST be the first characters in the string
const myShader = `
precision highp float;    

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_mouse;

uniform vec3 whiteReplacement; 
uniform vec3 blackReplacement; 


#define iTime u_time
#define iResolution u_resolution
#define iMouse u_mouse



float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h*h*h*k*(1.0/6.0);
}

// Fixed array length call for GLSL
float multiBlend(float a[5], float k){
    float complete = a[0];
    for(int i = 0; i < 4; i++){ // a.length() - 1 is 4
        complete = smin(complete, a[i+1], k);
    }
    return complete;
}

float sdSphere(vec3 p, float s){
    return length(p) - s;
}

float map(vec3 p){
    vec3 spherePos = vec3(-sin(iTime)*2.0, sin(iTime)*2.0, 0.0);
    float sphere[5];
    sphere[0] = sdSphere(p - spherePos, 0.9);
    
    vec3 spherePos2 = vec3(sin(iTime) * 0.3 + 2.0, cos(iTime)*1.5, sin(iTime)*0.4);
    sphere[1] = sdSphere(p - spherePos2, 0.5);
    
    vec3 spherePos3 = vec3(cos(iTime)*1.1, cos(iTime)*1.5, 0.0);
    sphere[2] = sdSphere(p - spherePos3, 0.8);
    
    vec3 spherePos4 = vec3(-cos(iTime*0.3)*2.2, -cos(iTime*0.7)*3.2 + 1.0, 0.0);
    sphere[3] = sdSphere(p - spherePos4, 0.71);
    
    vec3 spherePos5 = vec3(-cos(iTime*0.7)*1.5 - 2.4, -1.3, sin(iTime*0.7) - 1.0);
    sphere[4] = sdSphere(p - spherePos5, 0.53);
    
    return multiBlend(sphere, 2.0);
}

mat2 rotate(float angle){
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    vec2 mouseP = (iMouse.xy * 2.0 - iResolution.xy) / iResolution.y;
    
    vec3 ro = vec3(0.0, 0.0, -3.0);
    vec3 rd = normalize(vec3(uv * 1.1, 1.0));
    
    float t = 0.0;
    float d = 0.0;
    vec3 color = vec3(0.0);
    
    for(int i = 0; i < 80; i++){
        vec3 p = ro + rd * t;
        d = map(p);
        t += d;
        if(t > 100.0 || d < 0.01) break;
    }
    
    float factor = clamp(t * 0.15, 0.0, 1.0);

    
    
    color = mix(blackReplacement, whiteReplacement, factor);
    fragColor = vec4(color, 1.0);
}

// Explicit main function for WebGL 2
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

sandbox.load(myShader);

function updateShader() {


    
    sandbox.setUniform("whiteReplacement", globalBgColor[0], globalBgColor[1], globalBgColor[2]);
    sandbox.setUniform("blackReplacement", globalAltColor[0],globalAltColor[1],globalAltColor[2]);

    
    requestAnimationFrame(updateShader);
}


updateShader();


