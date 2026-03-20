const canvas = document.getElementById("glslCanvas");
const sandbox = new GlslCanvas(canvas);


const myShader = `
float smin(float a, float b, float k) {

    float h = max(k - abs(a - b), 0.0) / k;

    return min(a, b) - h*h*h*k*(1.0/6.0);

}

float multiBlend(float a[5], float k){
    float complete = a[0];
    for( int i = 0; i <  a.length() - 1; i++){
        complete = smin(complete,a[i+1], k);
        
    }
    return complete;
    

}



float sdSphere(vec3 p, float s){

    return length(p) - s;
}



float map(vec3 p){
    vec3 spherePos = vec3(-sin(iTime)*2.0,sin(iTime)*2.0,0.0);
    float sphere =  sdSphere(p - spherePos, 0.9);
    
    vec3 spherePos2 = vec3(sin(iTime) * 0.1 + 2.0,cos(iTime)*1.5, sin(iTime) - 1.0);
    float sphere2 =  sdSphere(p - spherePos2, 0.5);
    
    vec3 spherePos3 = vec3(cos(iTime)*1.1,cos(iTime)*1.5,0.0);
    float sphere3 =  sdSphere(p - spherePos3, 0.8);
    
    vec3 spherePos4 = vec3(-cos(iTime*0.3)*2.2 ,-cos(iTime*0.7)*3.2 + 1.0,0.0);
    float sphere4 =  sdSphere(p - spherePos4, 0.71);
    
    vec3 spherePos5 = vec3(-cos(iTime*0.7)*1.5 - 2.4, -1.3,sin(iTime*0.7) - 1.0);
    float sphere5 =  sdSphere(p - spherePos5, 0.53);
    
    float list[5] = float[5](sphere, sphere2, sphere3, sphere4, sphere5);
    
    
    
    return multiBlend(list, 2.0);
}

mat2 rotate(float angle){
    float s = sin(angle);
    float c = cos(angle);
    
    return mat2(c, -s, s, c);
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{


    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (fragCoord * 2.0 - iResolution.xy)/ iResolution.y;
    vec2 mouseP = (iMouse.xy * 2.0 - iResolution.xy)/ iResolution.y;
    
    vec3 ro = vec3(0.0,0.0,-3.0);  //rays origin - camera focus point
    vec3 rd = normalize(vec3(uv,1.0)); //ray direction
    
    ro.xz *= rotate(mouseP.x);
    ro.yz *= rotate(mouseP.y);
    
    rd.xz *= rotate(mouseP.x);
    rd.yz *= rotate(mouseP.y);
    
    
    
    
    float t = 0.0; //travel distance
    float d = 0.0; // distance to the nearest object
    vec3 color = vec3(0.0);// color
    
    //raymarching
    for(int i = 0; i < 80; i++){
    
    
    vec3 p = ro + rd * t; //current position of the point
    
    d = map(p); // setting the distance of nearest object
    
    t += d; // marching the ray forward

    
    
    if(t > 100.0 || d < 0.01) break; //too close or too far
    
    }
    
    
    color = vec3(t) * 0.02;
    

    
    // Output to screen
    fragColor = vec4(color,1.0);
}
`;

sandbox.load(myShader);