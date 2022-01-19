import { createTheme } from "@mui/system";

const appTheme = createTheme({
  components: {
    Button: {
      styleOverrides: {
        root: {
          backgroundColor: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          border: 0,
          borderRadius: 20,
        },
        primary: {
          backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          border: 0,
          borderRadius: 20,
        },
      },
    },
  },
});

// const GradientButton: FC<ButtonProps> = (
//   { variant, color, children },
//   props
// ) => {
//   return (
//     <Button color={color} variant={variant} {...props}>
//       {children}
//     </Button>
//   );
// };

export default appTheme;
