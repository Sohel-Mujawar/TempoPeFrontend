'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from '@tanstack/react-router';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import {PiSquaresFourLight} from 'react-icons/pi';
import {FiMenu, FiX} from 'react-icons/fi';
import {IoIosArrowDown} from 'react-icons/io';
import {useAuthContext} from '@/context/AuthContext';
import {DashboardIcon} from '@/icons';
import {
  MdInventory,
  MdCategory,
  MdAddBox,
  MdPeople,
  MdStore,
  MdLabel,
} from 'react-icons/md';
import {BsIntersect, BsMenuApp, BsPlusCircle} from 'react-icons/bs';
import {BiLabel} from 'react-icons/bi';
import {
  FaTruck,
  FaBuilding,
  FaShieldAlt,
  FaUserCircle,
  FaHome,
  FaInfoCircle,
} from 'react-icons/fa';

const Header = () => {
  const {pathname} = useLocation();
  const {user} = useAuthContext();
  const role = user?.role;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  /* ====================== NAVIGATION ROUTES WITH SUB-ICONS ====================== */
  const navigationRoutes =
    role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            path: '/dashboard',
            icon: <DashboardIcon size={22} />,
          },
          {
            label: 'Payout',
            path: '/admin/commisionreport',
            icon: <MdCategory size={22} />,
            subRoutes: [
              {
                label: 'Pending Commission',
                path: '/admin/pendingcommisionreport',
                icon: <MdAddBox size={18} />,
              },
              {
                label: 'Approved Commission',
                path: '/admin/approvedcommisionreport',
                icon: <MdPeople size={18} />,
              },
            ],
          },
        ]
      : role === 'USER'
        ? []
        : role === 'MARKETER'
          ? [
              {
                label: 'Dashboard',
                path: '/marketer/dashboard',
                icon: <DashboardIcon size={22} />,
              },
              {
                label: 'My Inventory',
                path: '/marketer/inventory',
                icon: <MdInventory size={22} />,
              },
              {
                label: 'Add Menu',
                icon: <BsMenuApp size={22} />,
                subRoutes: [
                  {
                    label: 'Add Material Category',
                    path: '/marketer/materialcat',
                    icon: <MdCategory size={18} />,
                  },
                  {
                    label: 'Add Material',
                    path: '/marketer/material',
                    icon: <BsPlusCircle size={18} />,
                  },
                  {
                    label: 'Add Supplier',
                    path: '/marketer/supplier',
                    icon: <MdStore size={18} />,
                  },
                  {
                    label: 'Add Client',
                    path: '/marketer/client',
                    icon: <MdPeople size={18} />,
                  },
                  {
                    label: 'Add Additional',
                    path: '/marketer/additional',
                    icon: <MdAddBox size={18} />,
                  },
                ],
              },
              {
                label: 'Awak',
                path: '/marketer/purchase',
                icon: <BsIntersect size={22} />,
              },
              {
                label: 'Jawak',
                path: '/marketer/jawak',
                icon: <BiLabel size={22} />,
              },
              {
                label: '100 No',
                path: '/marketer/hundredno',
                icon: <BiLabel size={22} />,
              },
            ]
          : [
              {
                label: 'Home',
                path: '/',
              },
              {
                label: 'Drive',
                path: '/driver',
              },
              {
                label: 'Business',
                path: '/business',
              },
              {
                label: 'Safety',
                path: '/safety',
              },
              {
                label: 'About Us',
                path: '/about',
              },
            ];

  /* ====================== HELPERS ====================== */
  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isActiveRoute = (p: string) =>
    pathname === p || pathname.startsWith(p + '/');
  const isActiveParent = (subs: Array<{path: string}>) =>
    subs.some((s) => isActiveRoute(s.path));

  /* ====================== CLICK OUTSIDE & RESIZE ====================== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAllMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => closeAllMenus(), [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ====================== RENDER ====================== */
  return (
    <header
      ref={headerRef}
      className="border-gray-200 dark:border-gray-800 sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm transition-all duration-300 dark:bg-boxdark/95"
    >
      {/* ====================== TOP BAR ====================== */}
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeAllMenus}
          className="flex items-center space-x-3 text-2xl font-bold transition-transform hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <span className="text-gray-900 text-2xl font-bold dark:text-white">
              Tempo<span className="text-lime-600">Pe</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-1">
          {navigationRoutes.map((route, i) => {
            const hasPath = !!route.path;
            const hasSubs = !!route.subRoutes?.length;
            const active = hasSubs
              ? isActiveParent(route.subRoutes!) ||
                (hasPath && isActiveRoute(route.path!))
              : hasPath && isActiveRoute(route.path!);

            return hasSubs ? (
              <div key={i} className="group relative">
                <button
                  onClick={() => toggleDropdown(route.label)}
                  className={`flex items-center gap-2.5 rounded-xl px-5 py-3 font-medium transition-all duration-300 ${
                    active
                      ? 'bg-lime-50 text-lime-700 shadow-sm dark:bg-lime-900/20 dark:text-lime-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-lime-50 hover:text-lime-700 dark:hover:bg-lime-900/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={
                        active
                          ? 'text-lime-600'
                          : 'text-gray-600 dark:text-gray-400'
                      }
                    >
                      {route.icon}
                    </span>
                    <span className="text-sm font-medium">{route.label}</span>
                  </span>
                  <IoIosArrowDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openDropdown === route.label ? 'rotate-180' : ''
                    } ${active ? 'text-lime-600' : 'text-gray-500'}`}
                  />
                </button>

                {/* Desktop Dropdown */}
                {openDropdown === route.label && (
                  <div className="border-gray-200 dark:border-gray-700 absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-2xl border bg-white p-2 shadow-xl dark:bg-boxdark">
                    <div className="space-y-1">
                      {route.subRoutes!.map((sub, si) => (
                        <Link
                          key={si}
                          to={sub.path}
                          onClick={closeAllMenus}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActiveRoute(sub.path)
                              ? 'bg-lime-50 text-lime-700 shadow-sm dark:bg-lime-900/20 dark:text-lime-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-lime-50 hover:text-lime-700 dark:hover:bg-lime-900/20'
                          }`}
                        >
                          <span
                            className={
                              isActiveRoute(sub.path)
                                ? 'text-lime-600'
                                : 'text-gray-500 dark:text-gray-400'
                            }
                          >
                            {sub.icon}
                          </span>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                to={route.path!}
                className={`relative flex items-center gap-2.5 rounded-xl px-5 py-3 font-medium transition-all duration-300 ${
                  active
                    ? 'text-lime-900 dark:text-lime-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-lime-900 dark:hover:text-lime-900'
                }`}
                onClick={closeAllMenus}
              >
                <span
                  className={
                    active
                      ? 'text-lime-600'
                      : 'text-gray-600 dark:text-gray-400'
                  }
                >
                  {route.icon}
                </span>
                <span className="text-sm font-medium">{route.label}</span>

                {/* Active Indicator - Underline */}
                {active && (
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-lime-600" />
                )}

                {/* Hover Effect */}
                <span className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:ring-2 group-hover:ring-lime-200 dark:group-hover:ring-lime-800/30" />
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* {!user && (
            <>
              <Link
                to="/signin"
                className="rounded-xl border border-lime-600 px-5 py-2 text-sm font-medium text-lime-700 transition-all hover:bg-lime-50 dark:border-lime-500 dark:text-lime-400 dark:hover:bg-lime-900/20"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-lime-600 to-lime-500 px-5 py-2 text-sm font-medium text-white shadow-lg transition-all hover:from-lime-700 hover:to-lime-600 hover:shadow-xl"
              >
                Register
              </Link>
            </>
          )} */}

          

          {/* <DarkModeSwitcher /> */}
          {user ? <DropdownUser /> : null}

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="text-gray-600 dark:text-gray-400 rounded-xl p-2.5 transition-all hover:bg-lime-50 hover:text-lime-700 dark:hover:bg-lime-900/20 lg:hidden"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ====================== MOBILE MENU ====================== */}
      {mobileMenuOpen && (
        <div className="border-gray-200 dark:border-gray-700 bg-white/95 backdrop-blur-sm dark:bg-boxdark/95 lg:hidden">
          <nav className="px-4 py-4">
            <div className="space-y-2">
              {navigationRoutes.map((route, i) => {
                const hasPath = !!route.path;
                const hasSubs = !!route.subRoutes?.length;
                const active = hasSubs
                  ? isActiveParent(route.subRoutes!) ||
                    (hasPath && isActiveRoute(route.path!))
                  : hasPath && isActiveRoute(route.path!);
                const isOpen = openDropdown === route.label;

                return (
                  <div key={i} className="space-y-1.5">
                    {/* PARENT */}
                    <div
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 font-medium transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-r from-lime-50 to-lime-100 text-lime-700 shadow-sm dark:from-lime-900/30 dark:to-lime-800/30 dark:text-lime-400'
                          : 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-lime-50 hover:text-lime-700 dark:hover:bg-lime-900/20'
                      }`}
                    >
                      {hasPath ? (
                        <Link
                          to={route.path!}
                          onClick={closeAllMenus}
                          className="flex flex-1 items-center gap-3"
                        >
                          <span
                            className={
                              active
                                ? 'text-lime-600'
                                : 'text-gray-600 dark:text-gray-400'
                            }
                          >
                            {route.icon}
                          </span>
                          <span className="text-sm font-semibold">
                            {route.label}
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => toggleDropdown(route.label)}
                          className="flex flex-1 items-center gap-3 text-left"
                        >
                          <span
                            className={
                              active
                                ? 'text-lime-600'
                                : 'text-gray-600 dark:text-gray-400'
                            }
                          >
                            {route.icon}
                          </span>
                          <span className="text-sm font-semibold">
                            {route.label}
                          </span>
                        </button>
                      )}

                      {hasSubs && (
                        <button
                          onClick={() => toggleDropdown(route.label)}
                          className="dark:hover:bg-gray-700 rounded-lg p-1.5 transition-all hover:bg-white/50"
                        >
                          <IoIosArrowDown
                            size={18}
                            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${active ? 'text-lime-600' : 'text-gray-500'}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* SUB-ROUTES WITH ICONS */}
                    {hasSubs && isOpen && (
                      <div className="ml-8 space-y-1.5 border-l-2 border-lime-200 pl-5 dark:border-lime-800">
                        {route.subRoutes!.map((sub, si) => (
                          <Link
                            key={si}
                            to={sub.path}
                            onClick={closeAllMenus}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                              isActiveRoute(sub.path)
                                ? 'bg-lime-50 text-lime-700 shadow-sm dark:bg-lime-900/30 dark:text-lime-400'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-lime-50 hover:text-lime-700 dark:hover:bg-lime-900/20'
                            }`}
                          >
                            <span
                              className={
                                isActiveRoute(sub.path)
                                  ? 'text-lime-600'
                                  : 'text-gray-500 dark:text-gray-400'
                              }
                            >
                              {sub.icon}
                            </span>
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Auth Buttons for non-logged in users */}
              {/* {!user && (
                <div className="border-gray-200 dark:border-gray-700 mt-4 flex flex-col gap-2 border-t pt-4">
                  <Link
                    to="/signin"
                    onClick={closeAllMenus}
                    className="rounded-xl border border-lime-600 px-4 py-3 text-center font-medium text-lime-700 transition-all hover:bg-lime-50 dark:border-lime-500 dark:text-lime-400 dark:hover:bg-lime-900/20"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeAllMenus}
                    className="rounded-xl bg-gradient-to-r from-lime-600 to-lime-500 px-4 py-3 text-center font-medium text-white shadow-lg transition-all hover:from-lime-700 hover:to-lime-600 hover:shadow-xl"
                  >
                    Register
                  </Link>
                </div>
              )} */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
