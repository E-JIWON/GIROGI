/**
 * 반응형 패널 프리미티브
 *
 * - 모바일: 바텀시트 (하단에서 올라옴, 탭바 높이 고려)
 * - PC (lg+): 우측 드로어 (오른쪽에서 슬라이드, 전체 높이)
 * - 열기/닫기 애니메이션 (300ms ease-out)
 * - 오버레이 클릭으로 닫기
 */

'use client'

import { useEffect, useState, useCallback, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PanelProps {
  /** 패널 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 패널 제목 */
  title?: string
  /** 제목 좌측 아이콘/요소 */
  titleIcon?: ReactNode
  /** PC 드로어 너비 (기본 480px) */
  width?: string
  /** 패널 내부 콘텐츠 */
  children: ReactNode
}

export function Panel({
  isOpen,
  onClose,
  title,
  titleIcon,
  width = '480px',
  children,
}: PanelProps) {
  // 애니메이션 상태: mounted(DOM 존재) → visible(transition 적용)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  // 열기: mount → 다음 프레임에서 visible
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true)
        })
      })
    } else {
      setVisible(false)
    }
  }, [isOpen])

  // 닫기 애니메이션 완료 후 unmount
  const handleTransitionEnd = useCallback(() => {
    if (!visible) {
      setMounted(false)
    }
  }, [visible])

  // body 스크롤 잠금
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* 오버레이 */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/40 transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* 패널 본체 */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{ '--panel-width': width } as React.CSSProperties}
        className={cn(
          'fixed z-50 bg-white shadow-xl transition-transform duration-300 ease-out',
          // 모바일: 바텀시트
          'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl pb-20',
          visible ? 'translate-y-0' : 'translate-y-full',
          // PC: 우측 드로어 (전체 높이)
          'lg:inset-y-0 lg:right-0 lg:left-auto lg:bottom-auto lg:w-[var(--panel-width)] lg:max-h-none lg:rounded-t-none lg:rounded-l-2xl lg:pb-0',
          visible ? 'lg:translate-x-0' : 'lg:translate-x-full',
          'lg:translate-y-0'
        )}
      >
        {/* 스크롤 컨테이너 */}
        <div className="h-full overflow-y-auto p-6">
          {/* 모바일 드래그 핸들 */}
          <div className="mb-4 flex justify-center lg:hidden">
            <div className="h-1 w-10 rounded-full bg-neutral-300" />
          </div>

          {/* 헤더 */}
          {title && (
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {titleIcon}
                <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
              >
                <X className="h-5 w-5 text-neutral-700" />
              </button>
            </div>
          )}

          {/* 콘텐츠 */}
          {children}
        </div>
      </div>
    </>
  )
}
