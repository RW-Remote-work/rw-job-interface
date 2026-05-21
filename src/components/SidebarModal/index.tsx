import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { CloseIcon } from '../Icons';

interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // 默认为 900px
  showMask?: boolean; // 是否显示遮罩，默认为 true
  pushContent?: boolean; // 是否推开内容，默认为 false
  title?: string; // 标题
  footer?: React.ReactNode; // 底部按钮区域
  showFooter?: boolean; // 是否显示 footer 区域，默认为 true
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  onClose,
  children,
  width = '900px',
  showMask = true,
  pushContent = false,
  title,
  footer,
  showFooter = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // 如果启用了 pushContent，给 body 添加类来推开主内容，并设置CSS变量
      if (pushContent) {
        document.body.classList.add(styles.pushMainContent);
        document.body.style.setProperty('--sidebar-width', width);
      }
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      
      // 移除推开主内容的类和CSS变量
      document.body.classList.remove(styles.pushMainContent);
      document.body.style.removeProperty('--sidebar-width');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.classList.remove(styles.pushMainContent);
      document.body.style.removeProperty('--sidebar-width');
    };
  }, [isOpen, onClose, pushContent, width]); // 添加 width 作为依赖

  useEffect(() => {
    if (isOpen) {
      // 触发打开动画
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.classList.add(styles.open);
        }
      }, 10);
    } else {
      if (modalRef.current) {
        modalRef.current.classList.remove(styles.open);
      }
    }
  }, [isOpen, width]); // 添加 width 作为依赖

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {showMask && <div className={styles.mask} onClick={onClose}></div>}
      <div
        ref={modalRef}
        className={`${styles.sidebarModal} ${isOpen ? styles.open : ''} ${pushContent ? styles.pushContent : ''}`}
        style={{ width }}
      >
        <div className={styles.header}>
          {title && <h3>{title}</h3>}
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon w="12px" h="12px" />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {showFooter && footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </>
  );
};

export default SidebarModal;
