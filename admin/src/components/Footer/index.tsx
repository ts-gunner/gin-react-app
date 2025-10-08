import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'wenji',
          title: '广州文基智能科技有限公司',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
