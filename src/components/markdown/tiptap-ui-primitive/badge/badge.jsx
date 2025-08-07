import * as React from "react"

export const Badge = React.forwardRef((
  {
    variant,
    size = "default",
    appearance = "default",
    trimText = false,
    className,
    children,
    ...props
  },
  ref
) => {
  return (
    <div
      ref={ref}
      className={`tiptap-badge ${className || ""}`}
      data-style={variant}
      data-size={size}
      data-appearance={appearance}
      data-text-trim={trimText ? "on" : "off"}
      {...props}>
      {children}
    </div>
  );
})

Badge.displayName = "Badge"

export default Badge
