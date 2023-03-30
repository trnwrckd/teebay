import React from 'react';
import './tab.css';

export default function Tab(props) {
  const { label, tab, setTab } = props;
  return (
    <button
      className={tab === label ? 'tab-active' : 'tab'}
      onClick={() => setTab(label)}
    >
      {label}
    </button>
  );
}
