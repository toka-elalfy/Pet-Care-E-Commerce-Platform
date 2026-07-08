type Variant = "brand" | "mono-dark" | "mono-light";

export function LogoMark({
    size = 36,
    variant = "brand",
    rounded = 0.3,
}: {
    size?: number;
    variant?: Variant;
    rounded?: number;
}) {
    const uid = `pc-${Math.random().toString(36).slice(2, 8)}`;
    const teal = "#0F766E";
    const tealDeep = "#134E4A";
    const sage = "#A7C7A3";
    const coral = "#F97360";
    const cream = "#FFF8F1";

    const bgStart =
        variant === "brand"
            ? teal
            : variant === "mono-light"
                ? "#FFFFFF"
                : tealDeep;
    const bgEnd =
        variant === "brand"
            ? tealDeep
            : variant === "mono-light"
                ? "#F5F2EB"
                : tealDeep;
    const pawFill =
        variant === "mono-light" ? teal : "#FFFFFF";
    const accent = variant === "mono-light" ? coral : coral;
    const heartFill =
        variant === "mono-light" ? coral : cream;

    const r = Math.round(size * rounded);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <defs>
                <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={bgStart} />
                    <stop offset="100%" stopColor={bgEnd} />
                </linearGradient>
                <radialGradient id={`${uid}-glow`} cx="30%" cy="25%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
                    <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Rounded tile */}
            <rect
                x="0"
                y="0"
                width="48"
                height="48"
                rx={r}
                ry={r}
                fill={`url(#${uid}-bg)`}
            />
            <rect
                x="0"
                y="0"
                width="48"
                height="48"
                rx={r}
                ry={r}
                fill={`url(#${uid}-glow)`}
            />

            {/* Sage ring — subtle depth */}
            <circle
                cx="24"
                cy="26"
                r="13.5"
                fill="none"
                stroke={sage}
                strokeOpacity="0.22"
                strokeWidth="1"
            />

            {/* Paw: 4 toe beans + main pad with a heart-shaped negative space */}
            <g fill={pawFill}>
                {/* Toe beans */}
                <ellipse cx="14.8" cy="18.5" rx="2.6" ry="3.2" />
                <ellipse cx="20.6" cy="14.8" rx="2.6" ry="3.4" />
                <ellipse cx="27.4" cy="14.8" rx="2.6" ry="3.4" />
                <ellipse cx="33.2" cy="18.5" rx="2.6" ry="3.2" />

                {/* Main pad — rounded trapezoid */}
                <path d="M16.5 24.5
                 C 16.5 20.9, 20 19.2, 24 19.2
                 C 28 19.2, 31.5 20.9, 31.5 24.5
                 L 31.5 30.5
                 C 31.5 34.5, 28.3 36.8, 24 36.8
                 C 19.7 36.8, 16.5 34.5, 16.5 30.5
                 Z" />
            </g>

            {/* Heart carved into the pad (care + personalization cue) */}
            <path
                d="M24 31.8
           C 22.2 30.3, 20 28.9, 20 26.9
           C 20 25.6, 21 24.7, 22.1 24.7
           C 22.9 24.7, 23.6 25.1, 24 25.8
           C 24.4 25.1, 25.1 24.7, 25.9 24.7
           C 27 24.7, 28 25.6, 28 26.9
           C 28 28.9, 25.8 30.3, 24 31.8 Z"
                fill={heartFill}
            />

            {/* Coral accent bean (top-right) — subtle reorder/dot cue */}
            <circle cx="38.5" cy="10" r="3.2" fill={accent} />
            <circle cx="38.5" cy="10" r="1.1" fill="#FFFFFF" opacity="0.85" />
        </svg>
    );
}

export function Logo({
    size = 36,
    wordmark = true,
    tagline = false,
    tone = "dark",
    variant = "brand",
}: {
    size?: number;
    wordmark?: boolean;
    tagline?: boolean;
    tone?: "dark" | "light";
    variant?: Variant;
}) {
    const textColor = tone === "light" ? "#FFFFFF" : "#1F2937";
    const accentColor = tone === "light" ? "#A7C7A3" : "#0F766E";
    return (
        <div className="flex items-center gap-2.5">
            <LogoMark size={size} variant={variant} />
            {wordmark && (
                <div className="flex flex-col leading-none">
                    <span
                        className="font-[Sora] font-semibold tracking-tight"
                        style={{
                            fontSize: size * 0.52,
                            color: textColor,
                            letterSpacing: "-0.015em",
                            lineHeight: 1,
                        }}
                    >
                        Zoo<span style={{ color: accentColor }}>topia</span>
                    </span>
                    {tagline && (
                        <span
                            className="font-[Manrope] font-semibold uppercase"
                            style={{
                                fontSize: Math.max(8, size * 0.22),
                                letterSpacing: "0.22em",
                                marginTop: size * 0.14,
                                color: tone === "light" ? "rgba(255,255,255,0.6)" : "#6B7280",
                            }}
                        >
                            Smart pet essentials
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
