import React from 'react';
import { NavLink } from 'react-router-dom';
import { useConfig } from '../../../../src/admin/components/utilities/Config';

// As this is the demo project, we import our dependencies from the `src` directory.
import Chevron from '../../../../src/admin/components/icons/Chevron';

// In your projects, you can import as follows:
// import { Chevron } from 'payload/components/icons';


const baseClass = 'after-nav-links';

const AfterNavLinks: React.FC = () => {
  const { routes: { admin: adminRoute } } = useConfig();

  return (
    <div className={baseClass}>
      <span className="nav__label">Custom Routes</span>
      <nav>
        <NavLink
          className="nav__link"
          activeClassName="active"
          to={`${adminRoute}/custom-default-route`}
        >
          <Chevron />
          Default Template
        </NavLink>
        <NavLink
          className="nav__link"
          activeClassName="active"
          to={`${adminRoute}/custom-minimal-route`}
        >
          <Chevron />
          Minimal Template
        </NavLink>
      </nav>
    </div>
  );
};

export default AfterNavLinks;
