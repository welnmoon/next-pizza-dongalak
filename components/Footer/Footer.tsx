const Footer = () => {
  return (
    <footer className="mt-20 bg-[#EFE8DE] border-t border-stone-200">
      <div className="text-center py-4">
        <p className="text-stone-600">
          © {new Date().getFullYear()} Next Pizza. Все права защищены.
        </p>
        <p className="text-stone-500">Сделано с ❤️ командой Next Pizza</p>
      </div>
    </footer>
  );
};

export default Footer;
