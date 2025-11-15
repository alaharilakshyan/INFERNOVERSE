// src/theme.js
import { createTheme } from "@mui/material/styles";

// ==========================================================
// 🎨 NEW COLOR SYSTEM (Modern Vibrant Palette)
// ==========================================================
const colorTokens = {
  primary: {
    main: "#6C63FF",
    light: "#8A85FF",
    dark: "#5046E5",
    gradient: "linear-gradient(135deg, #6C63FF 0%, #5046E5 100%)",
  },
  secondary: {
    main: "#FF6584",
    light: "#FF8DA3",
    dark: "#E5456A",
    gradient: "linear-gradient(135deg, #FF6584 0%, #E5456A 100%)",
  },
  accent: {
    main: "#00D4AA",
    light: "#40FFD6",
    dark: "#00B894",
    gradient: "linear-gradient(135deg, #00D4AA 0%, #00B894 100%)",
  },
  success: "#00C853",
  warning: "#FFAB00",
  error: "#FF5252",
  info: "#2196F3",
  deepPurple: "#7B4DFF",
  electricBlue: "#00B0FF"
};

// Stylish Fonts Configuration
const typographyConfig = {
  fontFamily: "'Space Grotesk', 'Inter', 'SF Pro Display', -apple-system, sans-serif",
  h1: {
    fontWeight: 800,
    fontSize: "4rem",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  h2: {
    fontWeight: 700,
    fontSize: "3rem",
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: "2.5rem",
    letterSpacing: "-0.01em",
  },
  h4: {
    fontWeight: 600,
    fontSize: "2rem",
  },
  h5: {
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  h6: {
    fontWeight: 500,
    fontSize: "1.25rem",
  },
  button: {
    fontWeight: 700,
    letterSpacing: "0.02em",
    textTransform: "none",
  },
  body1: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.5,
  }
};

// ==========================================================
// 🌞 LIGHT THEME - Modern & Airy
// ==========================================================
export const createLightTheme = () =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: colorTokens.primary.main,
        light: colorTokens.primary.light,
        dark: colorTokens.primary.dark,
        contrastText: "#ffffff",
      },
      secondary: {
        main: colorTokens.secondary.main,
        light: colorTokens.secondary.light,
        dark: colorTokens.secondary.dark,
        contrastText: "#ffffff",
      },
      accent: {
        main: colorTokens.accent.main,
        light: colorTokens.accent.light,
        dark: colorTokens.accent.dark,
        contrastText: "#000000",
      },
      background: {
        default: "#F8FAFF",
        paper: "#FFFFFF",
        gradient: "linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 100%)",
      },
      text: {
        primary: "#1A1D29",
        secondary: "#5A5F7D",
        muted: "#8F94B2",
      },
      glass: {
        light: "rgba(255, 255, 255, 0.75)",
        medium: "rgba(255, 255, 255, 0.5)",
        dark: "rgba(255, 255, 255, 0.25)",
        border: "rgba(255, 255, 255, 0.8)",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      },
    },

    typography: {
      ...typographyConfig,
      h1: {
        ...typographyConfig.h1,
        background: colorTokens.primary.gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      },
      h2: {
        ...typographyConfig.h2,
        color: colorTokens.primary.dark,
      },
      h3: {
        ...typographyConfig.h3,
        color: colorTokens.primary.main,
      },
    },

    shape: {
      borderRadius: 16,
    },

    shadows: [
      "none",
      "0 2px 8px rgba(108, 99, 255, 0.08)",
      "0 4px 16px rgba(108, 99, 255, 0.12)",
      "0 8px 24px rgba(108, 99, 255, 0.16)",
      "0 16px 32px rgba(108, 99, 255, 0.2)",
      ...Array(20).fill("none"),
    ],

    components: {
      // 🔘 ENHANCED BUTTONS with modern styles
      MuiButton: {
        variants: [
          {
            props: { variant: "gradient" },
            style: {
              background: colorTokens.primary.gradient,
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: "0.95rem",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transition: "left 0.5s",
              },
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 30px rgba(108, 99, 255, 0.4)",
                "&::before": {
                  left: "100%",
                },
              },
              "&:active": {
                transform: "translateY(-1px)",
              },
            },
          },
          {
            props: { variant: "neon" },
            style: {
              background: "transparent",
              color: colorTokens.accent.main,
              border: `2px solid ${colorTokens.accent.main}`,
              padding: "12px 28px",
              borderRadius: 14,
              fontWeight: 700,
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 0 20px ${colorTokens.accent.main}40`,
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: colorTokens.accent.gradient,
                opacity: 0,
                transition: "opacity 0.3s",
                zIndex: -1,
              },
              "&:hover": {
                color: "#000",
                transform: "translateY(-2px)",
                boxShadow: `0 0 30px ${colorTokens.accent.main}60`,
                "&::after": {
                  opacity: 1,
                },
              },
            },
          },
        ],
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 600,
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          },
          contained: {
            boxShadow: "0 4px 14px rgba(108, 99, 255, 0.25)",
          },
        },
      },

      // 🃏 ADVANCED GLASS CARDS with depth
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: 0,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.5), transparent)",
            },
            "&:hover": {
              transform: "translateY(-8px) scale(1.01)",
              boxShadow: "0 20px 40px rgba(108, 99, 255, 0.15)",
              border: "1px solid rgba(108, 99, 255, 0.3)",
            },
          },
        },
      },

      // ✏️ ENHANCED INPUT FIELDS
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              transition: "all 0.3s ease",
              fontFamily: "'Inter', sans-serif",
              "& fieldset": {
                borderColor: "#E2E8F0",
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderColor: colorTokens.primary.light,
                boxShadow: "0 0 0 3px rgba(108, 99, 255, 0.1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: colorTokens.primary.main,
                borderWidth: 2,
                boxShadow: `0 0 0 3px ${colorTokens.primary.main}20`,
              },
            },
            "& .MuiInputLabel-root": {
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            },
          },
        },
      },

      // 🔘 MODERN CHIPS
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 600,
            fontSize: "0.8rem",
            height: 32,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
          filled: {
            background: colorTokens.primary.gradient,
            color: "#fff",
          },
        },
      },

      // 🌫 GLASS APP BAR
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            color: colorTokens.primary.dark,
          },
        },
      },

      // ✨ FLOATING DIALOGS
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          },
        },
      },

      // 📊 ENHANCED CARDS CONTENT
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "24px",
            "&:last-child": {
              paddingBottom: "24px",
            },
          },
        },
      },
    },
  });

// ==========================================================
// 🌚 DARK THEME - Cyberpunk Inspired
// ==========================================================
export const createDarkTheme = () =>
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: colorTokens.primary.main,
        light: colorTokens.primary.light,
        dark: colorTokens.primary.dark,
        contrastText: "#ffffff",
      },
      secondary: {
        main: colorTokens.secondary.main,
        light: colorTokens.secondary.light,
        dark: colorTokens.secondary.dark,
        contrastText: "#ffffff",
      },
      accent: {
        main: colorTokens.accent.main,
        light: colorTokens.accent.light,
        dark: colorTokens.accent.dark,
        contrastText: "#000000",
      },
      background: {
        default: "#0A0B14",
        paper: "#15182B",
        gradient: "linear-gradient(135deg, #0A0B14 0%, #15182B 100%)",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B4B9D6",
        muted: "#7A80A3",
      },
      glass: {
        light: "rgba(21, 24, 43, 0.7)",
        medium: "rgba(21, 24, 43, 0.5)",
        dark: "rgba(21, 24, 43, 0.3)",
        border: "rgba(255, 255, 255, 0.1)",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
    },

    typography: {
      ...typographyConfig,
      h1: {
        ...typographyConfig.h1,
        background: `linear-gradient(135deg, ${colorTokens.primary.main} 0%, ${colorTokens.accent.main} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      },
      h2: {
        ...typographyConfig.h2,
        color: "#FFFFFF",
      },
      h3: {
        ...typographyConfig.h3,
        color: colorTokens.primary.light,
      },
    },

    shape: {
      borderRadius: 16,
    },

    shadows: [
      "none",
      "0 2px 12px rgba(0, 0, 0, 0.3)",
      "0 4px 20px rgba(0, 0, 0, 0.4)",
      "0 8px 30px rgba(0, 0, 0, 0.5)",
      "0 16px 40px rgba(0, 0, 0, 0.6)",
      ...Array(20).fill("none"),
    ],

    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "gradient" },
            style: {
              background: colorTokens.primary.gradient,
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 14,
              fontWeight: 700,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s",
              },
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: `0 12px 30px ${colorTokens.primary.main}40`,
                "&::before": {
                  left: "100%",
                },
              },
            },
          },
          {
            props: { variant: "neon" },
            style: {
              background: "transparent",
              color: colorTokens.accent.main,
              border: `2px solid ${colorTokens.accent.main}`,
              padding: "12px 28px",
              borderRadius: 14,
              fontWeight: 700,
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 0 25px ${colorTokens.accent.main}30`,
              "&:hover": {
                background: colorTokens.accent.gradient,
                color: "#000",
                transform: "translateY(-2px)",
                boxShadow: `0 0 35px ${colorTokens.accent.main}50`,
              },
            },
          },
        ],
      },

      MuiCard: {
        styleOverrides: {
          root: {
            background: "rgba(21, 24, 43, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              transform: "translateY(-8px)",
              border: "1px solid rgba(108, 99, 255, 0.3)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "rgba(10, 11, 20, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            background: "rgba(21, 24, 43, 0.9)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
  });

// ==========================================================
// 🔀 Theme Switcher Helper
// ==========================================================
export const getTheme = (mode) =>
  mode === "dark" ? createDarkTheme() : createLightTheme();

export default getTheme("light");