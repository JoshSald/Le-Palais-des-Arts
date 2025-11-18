export default function Navbar(): JSX.Element {
  return (
    <header className="py-10">
      <h1 className="text-center text-5xl font-serif tracking-tight uppercase">
        <span className="text-red-600">Le</span> Palais des Arts
      </h1>
      <p className="text-center text-sm mt-3 text-neutral-500 italic">
        From Monsieur Saucisse Juteuse Omelette's private collection
      </p>
    </header>
  );
}
