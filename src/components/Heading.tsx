import React, { ReactNode } from 'react';

// default props
const defaultHeadingProps = {
  heading: <strong>By Arron Lin</strong>,
};
type HeadingProps = { children: ReactNode } & typeof defaultHeadingProps;
const Heading = ({ heading, children }: HeadingProps) => {
  return (
    <div>
      {children}
      <h2>{heading}</h2>
    </div>
  );
};

Heading.defaultProps = defaultHeadingProps;

export default Heading;
