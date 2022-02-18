import React, { ReactNode } from 'react';

// default props
const defaultHeadingProps = {
  heading: <strong>By Arron Lin</strong>,
};
const Heading = ({
  heading,
  children,
}: {
  children: ReactNode;
} & typeof defaultHeadingProps) => {
  return (
    <div>
      {children}
      <h2>{heading}</h2>
    </div>
  );
};

Heading.defaultProps = defaultHeadingProps;

export default Heading;
