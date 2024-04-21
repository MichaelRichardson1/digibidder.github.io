import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import digibidderLogo from '../../images/auction-site-logo.png';

const RegisterHeader = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/">
          <Image src={digibidderLogo} alt="company-logo" width={150} height={75} />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/visitors">Back to Visitors</Link>
          </li>                
        </ul>
      </nav>
    </header>
  );
};

export default RegisterHeader;