import React, { useState, useEffect, useRef } from 'react';

export function ScrollIndicator() {
  var progressState = useState(0);
  var progress = progressState[0];
  var setProgress = progressState[1];
  var draggingState = useState(false);
  var isDragging = draggingState[0];
  var setIsDragging = draggingState[1];
  var visibleState = useState(false);
  var visible = visibleState[0];
  var setVisible = visibleState[1];
  var hoveringState = useState(false);
  var hovering = hoveringState[0];
  var setHovering = hoveringState[1];
  var pastHeroState = useState(false);
  var pastHero = pastHeroState[0];
  var setPastHero = pastHeroState[1];
  var trackRef = useRef(null);
  var hideTimer = useRef(null);

  useEffect(function() {
    function onScroll() {
      var coursesEl = document.getElementById('courses');
      var startY = coursesEl ? coursesEl.offsetTop * 0.5 : 300;
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setPastHero(scrollTop > startY);

      if (docHeight > 0) {
        setProgress(Math.max(0, Math.min(1, scrollTop / docHeight)));
      }

      // Show on scroll
      setVisible(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(function() { setVisible(false); }, 2000);
    }

    // Detect mouse near right edge
    function onMouseMove(e) {
      if (e.clientX > window.innerWidth - 40) {
        setHovering(true);
        clearTimeout(hideTimer.current);
      } else {
        setHovering(false);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    onScroll();
    return function() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(hideTimer.current);
    };
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

  if (!pastHero && !isDragging) return null;

  var isShowing = visible || hovering || isDragging;

  return (
    <div
      ref={trackRef}
      className="fixed z-50 cursor-pointer"
      style={{
        right: '4px',
        top: '80px',
        bottom: '20px',
        width: '20px',
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.5)',
        opacity: isShowing ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: isShowing ? 'auto' : 'none'
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      data-testid="scroll-indicator-bar"
    >
      <div
        style={{
          position: 'absolute',
          left: '3px',
          right: '3px',
          height: '40px',
          top: 'calc(' + (progress * 100) + '% - ' + (progress * 40) + 'px)',
          background: 'rgba(246,65,108,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '100px',
          border: '1px solid rgba(246,65,108,0.4)',
          transition: isDragging ? 'none' : 'top 0.15s ease-out'
        }}
      />
    </div>
  );
}
