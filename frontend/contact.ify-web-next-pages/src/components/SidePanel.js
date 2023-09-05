import Link from "next/link"

const SidePanel = () => {
  return (
    <div>
      <Link href="/new">
        <button>New Contact</button>
      </Link>
      <Link href="/favorites">
        <button>Favorites</button>
      </Link>
    </div>
  );
};

export default SidePanel;