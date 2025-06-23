import { Link } from "react-router-dom";
import "./sidebar.css";

type Props = {
  to: string;
  label: string;
};

const SidebarLink: React.FC<Props> = ({ to, label }) => {
  return (
    <Link to={to} className="sidebar-link">
      {label}
    </Link>
  );
};

export default SidebarLink;
