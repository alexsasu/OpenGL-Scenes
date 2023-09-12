#version 330
 
in vec3 FragPos;  
in vec3 Normal; 
in vec3 inLightPos;
in vec3 inViewPos;
in vec3 dir;
in vec3 ex_Color; 
in vec2 tex_Coord;
 
out vec4 out_Color;
 
uniform vec3 lightColor;
uniform int colorCode;
uniform sampler2D myTexture;
uniform sampler2D myNormalMap;
 
void main(void)
{
    if (colorCode == -1 || colorCode == 0 || colorCode == 1)  // For drawing textures, the ground, objects
    {
  	    // Ambient
        float ambientStrength = 0.2f;
        vec3 ambient = ambientStrength * lightColor;
  	
        // Diffuse
        vec3 normal;
        if (colorCode != -1 && colorCode != 0)
            normal = normalize(Normal);
        else
            normal = normalize(texture(myNormalMap, tex_Coord).xyz * 2.0f - 1.0f);
        vec3 lightDir = normalize(inLightPos - FragPos);
        // vec3 lightDir = normalize(dir);  // For directional light source
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = diff * lightColor;
    
        // Specular
        float specularStrength = 0.5f;
        vec3 viewDir = normalize(inViewPos - FragPos);  // Vector towards normalized observer (V)
        vec3 reflectDir = reflect(-lightDir, normal);  // Reflection of light ray (R)
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 1);
        vec3 specular = specularStrength * spec * lightColor;

        vec3 emission = vec3(0.0, 0.0, 0.0);

        if (colorCode == 0 || colorCode == 1)  // For the ground and objects
        {
            vec3 result = emission + (ambient + diffuse + specular) * ex_Color;
            out_Color = vec4(result, 1.0f);
        }
        else
            if (colorCode == -1)  // For textures
            {
                vec4 result = vec4(emission + (ambient + diffuse + specular), 1.0f) * texture(myTexture, tex_Coord);
                out_Color = result;
            }
    }
    else
        if (colorCode == 2)  // For drawing the shadow of objects
        {
            vec3 black = vec3 (0.0, 0.0, 0.0);
	        out_Color = vec4(black, 1.0);
        }
}
