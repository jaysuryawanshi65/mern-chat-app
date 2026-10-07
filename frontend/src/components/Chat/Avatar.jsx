export default function Avatar({ username = "User", userId = "000000000000000000000000", isOnline = false, avatarLink }) {
  const colors = ["#90CDF4", "#F56565", "#D6BCFA", "#BC85E0", "#7F9CF5", "#F6AD55", "#F687B3", "#68D391", "#FBBF24", "#4299E1"];
  let color = colors[0];
  try { color = colors[parseInt(String(userId).slice(-6), 16) % colors.length]; } catch {}
  return <div className="relative shrink-0">
    <div className="h-11 w-11 rounded-2xl grid place-items-center overflow-hidden text-white font-semibold" style={{ backgroundColor: color }}>
      {avatarLink ? <img src={avatarLink} alt={username} className="h-full w-full object-cover"/> : username[0]?.toUpperCase()}
    </div>
    {isOnline && <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-secondary border-2 border-background"/>}
  </div>;
}
