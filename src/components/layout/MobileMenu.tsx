"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

type NavigationLink = {
  label: string;
  href: string;
  number: string;
};

type MobileMenuProps = {
  links: readonly NavigationLink[];
  menuLabel: string;
  closeLabel: string;
  navigationLabel: string;
  mobileNavigationLabel: string;
  commissionsLabel: string;
  homeHref: string;
  email: string;
};

export function MobileMenu({
  links,
  menuLabel,
  closeLabel,
  navigationLabel,
  mobileNavigationLabel,
  commissionsLabel,
  homeHref,
  email,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open || dialog.open) return;

    dialog.showModal();
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = () => {
      if (!desktop.matches) return;
      const dialog = dialogRef.current;
      if (dialog?.open) dialog.close();
      setOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  function closeMenu({ restoreFocus = true } = {}) {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="flex min-h-11 items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink lg:hidden"
        aria-controls="mobile-navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {menuLabel}
        <span className="flex h-3 w-5 flex-col justify-between" aria-hidden="true">
          <span className="h-px w-5 bg-current" />
          <span className="h-px w-5 bg-current" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-labelledby="mobile-navigation-title"
        className="fixed inset-0 m-0 h-[100svh] max-h-none w-full max-w-none overflow-y-auto bg-ink p-0 text-bone backdrop:bg-ink/70 lg:hidden"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="sticky top-0 z-10 border-b border-bone/15 bg-ink">
          <Container className="flex h-[4.5rem] items-center justify-between">
            <Link
              href={homeHref}
              className="font-serif text-[1.25rem] font-normal tracking-[-0.025em] text-bone"
              onClick={() => closeMenu({ restoreFocus: false })}
            >
              Studio Kova
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="flex min-h-11 items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-bone"
              onClick={() => closeMenu()}
            >
              {closeLabel}
              <span className="relative h-3 w-5" aria-hidden="true">
                <span className="absolute left-0 top-[5px] h-px w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-[5px] h-px w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </Container>
        </div>

        <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col py-10">
          <p
            id="mobile-navigation-title"
            className="eyebrow text-bone/70"
          >
            {navigationLabel}
          </p>
          <nav aria-label={mobileNavigationLabel}>
            <ul className="mt-8">
              {links.map((link) => (
                <li key={link.href} className="border-t border-bone/15">
                  <Link
                    href={link.href}
                    className="flex min-h-[4.75rem] items-center justify-between py-4"
                    onClick={() => closeMenu({ restoreFocus: false })}
                  >
                    <span className="font-serif text-[2rem] font-light tracking-[-0.025em]">
                      {link.label}
                    </span>
                    <span className="eyebrow text-bone/70">
                      {link.number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-bone/15 pt-8">
            <p className="eyebrow text-bone/70">{commissionsLabel}</p>
            <a
              href={`mailto:${email}`}
              className="mt-3 inline-block font-serif text-2xl text-bone"
            >
              {email}
            </a>
          </div>
        </Container>
      </dialog>
    </>
  );
}
