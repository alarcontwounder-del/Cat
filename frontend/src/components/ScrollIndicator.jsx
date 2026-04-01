import React, { useState, useEffect } from 'react';

export function ScrollIndicator() {
  var progressState = useState(0);
  var progress = progressState[0];
  var setProgress = progressState[1];
  var visibleState = useState(false);
  var visible = visibleState[0];
  var setVisible = visibleState[1];

  var dragging = useState(false);
  var isDragging = dragging[0];
  var setIsDragging = dragging[1];

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
      timeout = setTimeout(function() { if (!isDragging) setVisible(false); }, 1500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); clearTimeout(timeout); };
  }, [isDragging]);

  function scrollToPosition(clientY) {
    var track = document.getElementById('scroll-track');
    if (!track) return;
    var rect = track.getBoundingClientRect();
    var clickY = Math.max(0, Math.min(clientY - rect.top, rect.height));
    var ratio = clickY / rect.height;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * docHeight, behavior: 'smooth' });
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setIsDragging(true);
    setVisible(true);
    scrollToPosition(e.clientY);

    function onMove(ev) { scrollToPosition(ev.clientY); }
    function onUp() {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function handleTouchStart(e) {
    setIsDragging(true);
    setVisible(true);
    scrollToPosition(e.touches[0].clientY);

    function onMove(ev) { ev.preventDefault(); scrollToPosition(ev.touches[0].clientY); }
    function onEnd() {
      setIsDragging(false);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    }
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  return (
    <div
      id="scroll-track"
      className="fixed right-1.5 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 cursor-pointer"
      style={{ opacity: visible || isDragging ? 1 : 0.25, height: '40vh', width: '10px' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      data-testid="scroll-indicator-bar"
    >
      <div className="w-full h-full rounded-full relative" style={{ backgroundColor: 'rgba(246,65,108,0.15)' }}>
        <div
          className="absolute left-0 w-full rounded-full transition-all duration-100"
          style={{
            backgroundColor: '#f6416c',
            height: '18%',
            top: (progress * 82) + '%',
            borderRadius: '100px'
          }}
        />
      </div>
    </div>
  );
}
