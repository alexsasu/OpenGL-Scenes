 #version 330

in vec4 ex_Color;
uniform int colorCode;
 
out vec4 out_Color;

void main(void)
{
  switch (colorCode)
  {
	case 0: 
	  out_Color = ex_Color;
	  break;
	case 1: // yellow - color for the sun
		out_Color=vec4 (1.0, 1.0, 0.0, 0.0);
		break;
	case 2: // gray - color for road
		out_Color=vec4 (0.5, 0.5, 0.5, 0.0);
		break;
	case 3: // white - color for the lane dividers
		out_Color=vec4 (1.0, 1.0, 1.0, 0.0);
		break;
	case 4: // black - color for the vehicles' wheels
		out_Color=vec4 (0.0, 0.0, 0.0, 0.0);
		break;
	case 5: // beige - color for the car that is overtaken
		out_Color=vec4 (0.627, 0.608, 0.511, 0.0);
		break;
	case 6: // blue - color for the car that performs the overtaking
		out_Color=vec4 (0.0, 0.0, 1.0, 0.0);
		break;
	case 7: // red - color for the truck
		out_Color=vec4 (1.0, 0.0, 0.0, 0.0);
		break;
	default:
		break;
  };
}
 