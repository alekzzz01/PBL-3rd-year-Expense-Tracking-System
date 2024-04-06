import React, { useEffect } from 'react';

function ThemeSelector() {

    const handleThemeChange = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');
    }, []); 

    return (
        <div className='absolute right-0 top-0 p-6'>

            <div className="dropdown dropdown-bottom dropdown-end">

                <div tabIndex={0} role="button" className="btn m-1">
                    Theme
                    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                    <li><button className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" onClick={() => handleThemeChange('light')}>Light</button></li>
                    <li><button className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" onClick={() => handleThemeChange('dark')}>Dark</button></li>
                    <li><button className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Synthwave" onClick={() => handleThemeChange('synthwave')}>Synthwave</button></li>
                    <li><button className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" onClick={() => handleThemeChange('retro')}>Retro</button></li>
                </ul>

            </div>

            

        </div>
    );
}

export default ThemeSelector;
