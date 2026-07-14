"use client";

export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="דברו איתנו בוואטסאפ"
      className="whatsapp-float fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
    >
      <span className="whatsapp-float-pulse" aria-hidden />
      <span className="whatsapp-float-pulse whatsapp-float-pulse-delay" aria-hidden />
      <svg
        viewBox="0 0 32 32"
        className="relative z-10 h-8 w-8 sm:h-9 sm:w-9"
        fill="currentColor"
        aria-hidden
      >
        <path d="M16.04 3C9.39 3 4 8.36 4 14.97c0 2.1.55 4.15 1.6 5.96L4 29l8.27-1.55a12.1 12.1 0 0 0 3.77.6h.01c6.65 0 12.04-5.36 12.04-11.97C28.09 8.36 22.7 3 16.04 3zm0 21.84h-.01a10.05 10.05 0 0 1-5.12-1.4l-.37-.22-4.9.92.93-4.78-.24-.39a9.94 9.94 0 0 1-1.53-5.32c0-5.5 4.51-9.97 10.06-9.97 2.69 0 5.21 1.04 7.11 2.93a9.87 9.87 0 0 1 2.95 7.06c0 5.5-4.51 9.97-10.05 9.97zm5.52-7.46c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
