import React from 'react';
import styled from 'styled-components/macro';

interface SAvatarProps {
  lg: boolean;
}

const SAvatar = styled.div<SAvatarProps>`
  width: ${(props) => (props.lg ? '30px' : '25px')};
  height: 25px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

interface Props {
  url?: string;
  lg?: boolean;
}

const Avatar: React.FC<Props> = ({ url = '', lg = false }) => (
  <SAvatar lg={lg}>{url !== '' ? <Img src={url} /> : null}</SAvatar>
);

export default Avatar;
