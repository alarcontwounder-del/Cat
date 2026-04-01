import React, { useState, useEffect } from 'react';

export function ScrollIndicator() {
  var progressState = useState(0);
  var progress = progressState[0];
  var setProgress = progressState[1];
  var visibleState = useState(false);
  var visible = visibleState[0];
  var setVisible = visibleState[1];

  useEffect(function() {
    var timeout;
    function onScroll() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(scrollTop / docHeight);
      }
      setVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(function() { setVisible(false); }, 1500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); clearTimeout(timeout); };
  }, []);

  function handleClick(e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var clickY = e.clientY - rect.top;
    var ratio = clickY / rect.height;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * docHeight, behavior: 'smooth' });
  }

  return (
    <div
      className="fixed right-1 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 cursor-pointer"
      style={{ opacity: visible ? 1 : 0.3, height: '40vh' }}
      onClick={handleClick}
      data-testid="scroll-indicator-bar"
    >
      <div className="w-1.5 h-full rounded-full relative" style={{ backgroundColor: 'rgba(246,65,108,0.12)' }}>
        <div
          className="absolute left-0 w-1.5 rounded-full transition-all duration-150"
          style={{
            backgroundColor: '#f6416c',
            height: '15%',
            top: (progress * 85) + '%'
          }}
        />
      </div>
    </div>
  );
}
