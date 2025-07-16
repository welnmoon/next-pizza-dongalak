const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-100">
      <div className="text-center py-4">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Next Pizza. Все права защищены.
        </p>
        <p className="text-gray-500">Сделано с ❤️ командой Next Pizza</p>
      </div>
    </footer>
  );
};

export default Footer;
