import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function NavigationBar({ user }) {
    const isAdmin = user.tipo === 'ADMIN';
    const isAluno = user.tipo === 'ESTUDANTE';

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <header className="bg-navy-deep text-white">
            <div className="max-w-[1180px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link
                        href={route('dashboard')}
                        className="flex items-center gap-2 font-display font-semibold text-lg text-white no-underline"
                        aria-label="Carteira Digital de Certificados, ir para o início"
                    >
                        <span
                            className="w-9 h-9 rounded-icon bg-action-blue flex items-center justify-center shrink-0"
                            aria-hidden="true"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6a2 2 0 012-2h9l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
                                <path d="M8 13l2.5 2.5L16 10" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Carteira Digital
                    </Link>

                    {/* Navegação desktop */}
                    <nav className="hidden lg:flex gap-6" aria-label="Navegação principal">
                        <Link
                            href={route('dashboard')}
                            className={`text-sm font-medium py-2 border-b-2 transition-colors ${
                                route().current('dashboard*')
                                    ? 'text-white border-action-blue'
                                    : 'text-[#C9D3E0] border-transparent hover:text-white hover:border-action-blue'
                            }`}
                        >
                            Dashboard
                        </Link>

                        {(isAluno || isAdmin) && (
                            <Link
                                href={route('certificados.index')}
                                className={`text-sm font-medium py-2 border-b-2 transition-colors ${
                                    route().current('certificados.index')
                                        ? 'text-white border-action-blue'
                                        : 'text-[#C9D3E0] border-transparent hover:text-white hover:border-action-blue'
                                }`}
                            >
                                {isAdmin ? 'Gerenciar Certificados' : 'Certificados'}
                            </Link>
                        )}
                    </nav>

                    {/* CTA + dropdown do usuário (desktop) */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isAluno && (
                            <Link
                                href={route('certificados.create')}
                                className="inline-flex items-center justify-center min-h-touch px-5 py-3 rounded-btn bg-action-blue text-white text-sm font-semibold hover:bg-action-blue-dark transition-colors"
                            >
                                Novo Certificado
                            </Link>
                        )}

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 min-h-touch px-3 py-2 rounded-btn bg-navy-secondary text-sm font-medium text-[#E5EAF1] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-action-blue focus-visible:outline-offset-2"
                                >
                                    <div className="text-left">
                                        <div>{user.name}</div>
                                        <div className="text-xs text-[#C9D3E0]">
                                            {user.tipo === 'ADMIN' ? 'Administrador' : 'Estudante'}
                                        </div>
                                    </div>

                                    <svg
                                        className="w-4 h-4 shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    {/* Botão do menu mobile */}
                    <button
                        id="navToggle"
                        aria-expanded={showingNavigationDropdown}
                        aria-controls="mobileMenu"
                        aria-label={showingNavigationDropdown ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
                        onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                        className="lg:hidden w-11 h-11 rounded-icon bg-navy-secondary flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-action-blue focus-visible:outline-offset-2"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                className={!showingNavigationDropdown ? 'inline' : 'hidden'}
                                d="M3 6h18M3 12h18M3 18h18"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                className={showingNavigationDropdown ? 'inline' : 'hidden'}
                                d="M6 6l12 12M6 18L18 6"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navegação mobile */}
                <nav
                    id="mobileMenu"
                    className={`${showingNavigationDropdown ? 'flex' : 'hidden'} lg:hidden flex-col gap-1 pb-6 border-t border-white/10 pt-4`}
                    aria-label="Navegação móvel"
                >
                    <Link
                        href={route('dashboard')}
                        className={`min-h-touch flex items-center px-2 rounded-btn text-[15px] hover:bg-navy-secondary ${
                            route().current('dashboard*') ? 'text-white bg-navy-secondary' : 'text-[#E5EAF1]'
                        }`}
                    >
                        Dashboard
                    </Link>

                    {(isAluno || isAdmin) && (
                        <Link
                            href={route('certificados.index')}
                            className={`min-h-touch flex items-center px-2 rounded-btn text-[15px] hover:bg-navy-secondary ${
                                route().current('certificados.index') ? 'text-white bg-navy-secondary' : 'text-[#E5EAF1]'
                            }`}
                        >
                            {isAdmin ? 'Gerenciar Certificados' : 'Certificados'}
                        </Link>
                    )}

                    {isAluno && (
                        <Link
                            href={route('certificados.create')}
                            className="mt-2 min-h-touch flex items-center justify-center rounded-btn bg-action-blue text-white text-sm font-semibold"
                        >
                            Novo Certificado
                        </Link>
                    )}

                    <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="px-2 pb-2">
                            <div className="text-[15px] font-medium text-white">{user.name}</div>
                            <div className="text-xs text-[#C9D3E0]">{user.email}</div>
                        </div>

                        <Link
                            href={route('profile.edit')}
                            className="min-h-touch flex items-center px-2 rounded-btn text-[#E5EAF1] text-[15px] hover:bg-navy-secondary"
                        >
                            Profile
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="min-h-touch w-full flex items-center px-2 rounded-btn text-[#E5EAF1] text-[15px] hover:bg-navy-secondary"
                        >
                            Log Out
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}