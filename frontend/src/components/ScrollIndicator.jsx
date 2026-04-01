import React, { useState, useEffect, useRef } from 'react';

export function ScrollIndicator() {
  var progressState = useState(0);
  var progress = progressState[0];
  var setProgress = progressState[1];
  var draggingState = useState(false);
  var isDragging = draggingState[0];
  var setIsDragging = draggingState[1];
  var trackRef = useRef(null);
  var showState = useState(false);
  var show = showState[0];
  var setShow = showState[1];

  useEffect(function() {
    function onScroll() {
      // Get courses section top as the start point
      var coursesEl = document.getElementById('courses');
      var startY = coursesEl ? coursesEl.offsetTop : 0;
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Only show after hero
      if (scrollTop > startY * 0.5) {
        setShow(true);
      } else {
        setShow(false);
      }

      if (docHeight > 0) {
        setProgress(Math.max(0, Math.min(1, scrollTop / docHeight)));
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  function scrollToRatio(clientY) {
    if (!trackRef.current) return;
    var rect = trackRef.current.getBoundingClientRect();
    var y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    var ratio = y / rect.height;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * docHeight });
  }

  function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    scrollToRatio(e.clientY);
    function onMove(ev) { ev.preventDefault(); scrollToRatio(ev.clientY); }
    function onUp() { setIsDragging(false); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function onTouchStart(e) {
    setIsDragging(true);
    scrollToRatio(e.touches[0].clientY);
    function onMove(ev) { ev.preventDefault(); scrollToRatio(ev.touches[0].clientY); }
    function onEnd() { setIsDragging(false); document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); }
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  if (!show && !isDragging) return null;

  var pillHeight = 40;

  return (
    <div
      ref={trackRef}
      className="fixed z-50 cursor-pointer"
      style={{
        right: '6px',
        top: '80px',
        bottom: '20px',
        width: '14px',
        background: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.4)',
        opacity: isDragging ? 1 : 0.7,
        transition: 'opacity 0.3s'
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      data-testid="scroll-indicator-bar"
    >
      <div
        style={{
          position: 'absolute',
          left: '2px',
          right: '2px',
          height: pillHeight + 'px',
          top: 'calc(' + (progress * 100) + '% - ' + (progress * pillHeight) + 'px)',
          background: 'rgba(246,65,108,0.4)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: '100px',
          border: '1px solid rgba(246,65,108,0.3)',
          transition: isDragging ? 'none' : 'top 0.15s ease-out'
        }}
      />
    </div>
  );
}
