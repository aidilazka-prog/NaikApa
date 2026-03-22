export function AnimatedHeroSVG() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[2.5/1]">
      <svg
        className="w-full h-full drop-shadow-sm"
        viewBox="0 0 500 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background city silhouette */}
        <path d="M50 150H70V100H100V150H120V80H150V150H180V120H210V150H240V70H270V150H290V110H320V150H350V100H380V150H400V150" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" strokeLinejoin="round"/>
        
        {/* Curved Track for Train */}
        <path
          d="M 40 160 C 180 160, 250 80, 420 80"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="10 10"
          className="animate-[dash_20s_linear_infinite]"
        />
        
        {/* Animated Train on Track */}
        <g className="animate-[moveTrain_5s_ease-in-out_infinite_alternate]">
          <path d="M -35 150 L 15 150 C 20 150, 25 154, 25 160 L -35 160 Z" fill="currentColor" className="text-primary"/>
          <path d="M -5 154 h 10 v 4 h -10 z" fill="white" />
          <path d="M -25 154 h 10 v 4 h -10 z" fill="white" />
        </g>
        
        {/* Lower Track for Car */}
        <path
          d="M 20 180 L 480 180"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated Car */}
        <g className="animate-[moveCar_3.5s_ease-in-out_infinite_alternate]">
          {/* Car body */}
          <path d="M 460 174 h -25 l -6 8 h 38 l -6 -8 z" fill="currentColor" className="text-orange-500"/>
          <path d="M 465 174 h -15 l -4 6 h 23 l -3 -6 z" fill="white" fillOpacity="0.8"/>
          {/* Car wheels */}
          <circle cx="438" cy="180" r="3" fill="currentColor"/>
          <circle cx="460" cy="180" r="3" fill="currentColor"/>
        </g>

        {/* Start & End Map Pins */}
        <g transform="translate(45, 145)">
          <path d="M0 -20 C -6 -20, -10 -15, -10 -10 C -10 -3, 0 5, 0 5 C 0 5, 10 -3, 10 -10 C 10 -15, 6 -20, 0 -20 Z" fill="currentColor" className="text-muted-foreground drop-shadow-md"/>
          <circle cx="0" cy="-12" r="3" fill="white"/>
        </g>
        
        <g transform="translate(420, 65)">
          <path d="M0 -20 C -6 -20, -10 -15, -10 -10 C -10 -3, 0 5, 0 5 C 0 5, 10 -3, 10 -10 C 10 -15, 6 -20, 0 -20 Z" fill="currentColor" className="text-destructive drop-shadow-md"/>
          <circle cx="0" cy="-12" r="3" fill="white"/>
        </g>

        <style>
          {`
            @keyframes moveTrain {
              0% { transform: translate(50px, 0px) scale(1); }
              100% { transform: translate(400px, -80px) scale(0.85); }
            }
            @keyframes moveCar {
              0% { transform: translate(0, 0); }
              20% { transform: translate(-30px, 0); }
              100% { transform: translate(-400px, 0); }
            }
            @keyframes dash {
              to { stroke-dashoffset: -400; }
            }
          `}
        </style>
      </svg>
    </div>
  );
}
