import newsIcon from "../assets/news-icon-13.jpg";

export default function Header() {
  return (
    <header className="z-10 w-full items-center space-between flex bg-cyan-950 p-4 sticky top-0 left-0 text-white">
      <img src={newsIcon} className="w-18 ml-2" alt="News icon" />
      <p className="ml-3 font-bold text-xl">Your Local News</p>
    </header>
  );
}
