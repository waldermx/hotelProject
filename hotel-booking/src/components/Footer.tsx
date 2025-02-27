import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LuxStay Hotel</h3>
            <p className="text-gray-600">
              Una experiencia de hospedaje de lujo para los viajeros más exigentes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-gray-600 hover:text-primary">
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="text-gray-600 not-italic">
              Avenida Oceanside 123<br />
              Costa Dorada<br />
              info@luxstay.com<br />
              +1 (555) 123-4567
            </address>
          </div>
        </div>
        <div className="border-t pt-6 mt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} LuxStay Hotel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}