import React from 'react';
import styles from './HorizontalScroll.module.css';

export const HorizontalScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.horizontalScroll}>
            {children}
        </div>
    );
};