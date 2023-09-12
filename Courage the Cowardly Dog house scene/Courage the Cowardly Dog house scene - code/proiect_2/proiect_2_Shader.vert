#version 330

layout(location=0) in vec4 in_Position;
layout(location=1) in vec3 in_Color;
layout(location=2) in vec3 in_Normal;
layout(location=3) in vec2 texCoord;
 
out vec3 FragPos;
out vec3 Normal;
out vec3 inLightPos;
out vec3 inViewPos;
out vec3 ex_Color;
out vec3 dir;
out vec2 tex_Coord;
 
uniform mat4 matShadow;
uniform mat4 myMatrix;
uniform mat4 view;
uniform mat4 projection;
uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform int colorCode;

void main(void)
{
    ex_Color = in_Color;
    tex_Coord = vec2(texCoord.x, 1 - texCoord.y);

   	if (colorCode == -1 || colorCode == 0 || colorCode == 1)  // For drawing textures, the ground, objects
    {
		gl_Position = projection * view * myMatrix * in_Position;
        Normal = mat3(projection * view * myMatrix) * in_Normal; 
        inLightPos = vec3(projection * view * myMatrix * vec4(lightPos, 1.0f));
        inViewPos = vec3(projection * view * myMatrix * vec4(viewPos, 1.0f));
        dir = mat3(projection * view * myMatrix) * vec3(0.0,100.0,200.0);  // For directional light source
    }
    else
	    if (colorCode == 2)  // For drawing the shadow of objects
		    gl_Position = projection * view * matShadow * myMatrix * in_Position;

    FragPos = vec3(gl_Position);
}
