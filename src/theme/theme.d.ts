import '@mui/material/styles';

/**
 * This is a special setup block for TypeScript.
 * Because we added our custom 'lineClamp' tool to the theme's mixins earlier,
 * we have to declare it here. This tells TypeScript, "Hey, this custom function exists!"
 * so it doesn't show an error when we try to use it in our components.
 */
declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        lineClamp: (lines: number) => CSSProperties;
    }
}
