import React from 'react';
import Image from 'next/image';
import diggibidderLogo from '../../images/auction-site-logo.png';

const IndexHeader = () => {
  return (
    <header>
      <div className="logo">
        <Image src={diggibidderLogo} alt="company-logo" width={150} height={75} />
      </div>
    </header>
  );
};

export default IndexHeader;