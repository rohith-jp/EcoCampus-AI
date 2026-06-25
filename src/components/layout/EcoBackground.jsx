const EcoBackground = () => (
  <div className="eco-bg">
    <svg viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Hills */}
      <ellipse cx="200" cy="820" rx="380" ry="200" fill="#ceefd7" opacity=".6"/>
      <ellipse cx="900" cy="850" rx="600" ry="220" fill="#b8e8c6" opacity=".5"/>
      <ellipse cx="1350" cy="840" rx="350" ry="180" fill="#c5ecce" opacity=".5"/>
      {/* Sun glow */}
      <circle cx="1150" cy="120" r="90" fill="#fffbe6" opacity=".6"/>
      <circle cx="1150" cy="120" r="130" fill="#fffde8" opacity=".3"/>
      {/* Grid lines */}
      <line x1="0" y1="400" x2="1400" y2="400" stroke="#b3dcc0" strokeWidth=".5" opacity=".4"/>
      <line x1="700" y1="0" x2="700" y2="800" stroke="#b3dcc0" strokeWidth=".5" opacity=".4"/>
      {/* Wind turbine 1 */}
      <g transform="translate(80,360)">
        <line x1="0" y1="0" x2="0" y2="200" stroke="#a0cbb0" strokeWidth="4"/>
        <g className="turbine-anim" transform="translate(0,0)">
          <ellipse cx="0" cy="-50" rx="6" ry="55" fill="#7fc49a" transform="rotate(0)"/>
          <ellipse cx="0" cy="-50" rx="6" ry="55" fill="#7fc49a" transform="rotate(120)"/>
          <ellipse cx="0" cy="-50" rx="6" ry="55" fill="#7fc49a" transform="rotate(240)"/>
          <circle cx="0" cy="0" r="8" fill="#3dbf62"/>
        </g>
      </g>
      {/* Wind turbine 2 */}
      <g transform="translate(200,390)">
        <line x1="0" y1="0" x2="0" y2="170" stroke="#a0cbb0" strokeWidth="3"/>
        <g className="turbine-anim" style={{animationDuration:'8s'}} transform="translate(0,0)">
          <ellipse cx="0" cy="-40" rx="5" ry="44" fill="#8ccba2" transform="rotate(60)"/>
          <ellipse cx="0" cy="-40" rx="5" ry="44" fill="#8ccba2" transform="rotate(180)"/>
          <ellipse cx="0" cy="-40" rx="5" ry="44" fill="#8ccba2" transform="rotate(300)"/>
          <circle cx="0" cy="0" r="6" fill="#3dbf62"/>
        </g>
      </g>
      {/* Solar panels */}
      <g transform="translate(900,570)" className="panel-float">
        <rect x="-70" y="0" width="50" height="35" rx="3" fill="#4a9eff" opacity=".55"/>
        <rect x="-15" y="0" width="50" height="35" rx="3" fill="#3a8ee8" opacity=".55"/>
        <rect x="-70" y="40" width="50" height="35" rx="3" fill="#3a8ee8" opacity=".55"/>
        <rect x="-15" y="40" width="50" height="35" rx="3" fill="#2a7ed4" opacity=".55"/>
        <line x1="-20" y1="-10" x2="10" y2="0" stroke="#a0c8e0" strokeWidth="2" opacity=".5"/>
        <line x1="-60" y1="-10" x2="-30" y2="0" stroke="#a0c8e0" strokeWidth="2" opacity=".5"/>
      </g>
      {/* Trees */}
      <g transform="translate(320,480)">
        <rect x="-6" y="60" width="12" height="50" fill="#8aac7a" opacity=".8"/>
        <ellipse cx="0" cy="50" rx="38" ry="52" fill="#6db881" opacity=".6" className="leaf-anim"/>
        <ellipse cx="0" cy="20" rx="26" ry="35" fill="#5aa36c" opacity=".7"/>
      </g>
      <g transform="translate(420,510)">
        <rect x="-5" y="50" width="10" height="40" fill="#8aac7a" opacity=".8"/>
        <ellipse cx="0" cy="40" rx="28" ry="40" fill="#7ac38a" opacity=".6" className="leaf-anim" style={{animationDelay:'.7s'}}/>
      </g>
      <g transform="translate(1050,480)">
        <rect x="-6" y="55" width="12" height="55" fill="#8aac7a" opacity=".8"/>
        <ellipse cx="0" cy="45" rx="40" ry="55" fill="#65c07a" opacity=".55" className="leaf-anim" style={{animationDelay:'1.3s'}}/>
        <ellipse cx="0" cy="15" rx="28" ry="36" fill="#50aa65" opacity=".6"/>
      </g>
      <g transform="translate(1160,500)">
        <rect x="-5" y="48" width="10" height="44" fill="#8aac7a" opacity=".8"/>
        <ellipse cx="0" cy="38" rx="30" ry="44" fill="#78c48a" opacity=".55" className="leaf-anim" style={{animationDelay:'2s'}}/>
      </g>
      {/* Smart city buildings */}
      <g transform="translate(560,400)" opacity=".28">
        <rect x="0" y="0" width="30" height="80" rx="2" fill="#44886e"/>
        <rect x="8" y="8" width="6" height="8" rx="1" fill="#90d8b8"/>
        <rect x="18" y="8" width="6" height="8" rx="1" fill="#90d8b8"/>
        <rect x="8" y="24" width="6" height="8" rx="1" fill="#90d8b8"/>
        <rect x="18" y="24" width="6" height="8" rx="1" fill="#90d8b8"/>
        <rect x="8" y="40" width="6" height="8" rx="1" fill="#90d8b8"/>
        <rect x="18" y="40" width="6" height="8" rx="1" fill="#90d8b8"/>
      </g>
      <g transform="translate(600,420)" opacity=".25">
        <rect x="0" y="0" width="22" height="60" rx="2" fill="#3d7560"/>
        <rect x="5" y="8" width="5" height="6" rx="1" fill="#80c8a8"/>
        <rect x="13" y="8" width="5" height="6" rx="1" fill="#80c8a8"/>
        <rect x="5" y="22" width="5" height="6" rx="1" fill="#80c8a8"/>
        <rect x="13" y="22" width="5" height="6" rx="1" fill="#80c8a8"/>
      </g>
      {/* Tech dots network */}
      <circle cx="700" cy="200" r="4" fill="#3dbf62" opacity=".4"/>
      <circle cx="600" cy="300" r="3" fill="#00b4a0" opacity=".35"/>
      <circle cx="800" cy="280" r="5" fill="#3dbf62" opacity=".3"/>
      <circle cx="500" cy="180" r="3" fill="#2492d1" opacity=".4"/>
      <circle cx="1000" cy="220" r="4" fill="#00b4a0" opacity=".3"/>
      <line x1="700" y1="200" x2="600" y2="300" stroke="#3dbf62" strokeWidth=".8" opacity=".2"/>
      <line x1="700" y1="200" x2="800" y2="280" stroke="#3dbf62" strokeWidth=".8" opacity=".2"/>
      <line x1="600" y1="300" x2="500" y2="180" stroke="#00b4a0" strokeWidth=".8" opacity=".2"/>
    </svg>
  </div>
)

export default EcoBackground
