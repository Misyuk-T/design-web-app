/**
 * Alias for Hairline. The ux-spec calls this primitive "Divider"; the
 * architecture ownership map calls it "Hairline". Both import paths resolve to
 * the same 1px oat rule so parallel agents never collide on the name.
 */
export { Hairline as Divider, Hairline, default } from "./Hairline";
export type { HairlineProps as DividerProps } from "./Hairline";
