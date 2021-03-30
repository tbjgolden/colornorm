# Rounding/Clamping

In order to normalize colors, a common standard for rounding needs to be used.

This is necessary, as to determine at what point `rgba(r, g, b, 0.1)` is
equivalent to `rgba(r, g, b, 0.09999)`.

Is it at 1 decimal place, or 20?

In the CSS color working draft - it suggests that browsers should serialize to a
minimum of 2 decimal places (and many browsers follow this), for decimal alpha
values, but does not prescribe a maximum. But 8 digit hex colors use 256 values
for alpha, which is of greater precision. Which do we use?

## Proposed solution

Serialize every color in transit as an 8 hex color.
