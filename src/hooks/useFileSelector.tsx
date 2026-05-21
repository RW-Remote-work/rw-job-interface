'use client'
import type { InputHTMLAttributes } from 'react'
import { useRef } from 'react'
import { useEventCallback } from './useEventCallback'
import { useGlobalContext } from '@/components/GlobalProvider/useGlobalContext'
import { useLatest } from 'react-use'

interface UseFileSelectorOptions extends Omit<InputHTMLAttributes<HTMLInputElement>, 'max'> {
    /**
     * The limit of files to be selected.
     * @default 1
     */
    max?: number
    onChangeFiles?: (files: File[]) => void
}

export function useFileSelector({ accept, max = 1, onChange, onChangeFiles }: UseFileSelectorOptions) {
    const { render } = useGlobalContext()
    const onChangeRef = useLatest(onChange)
    const onChangeFilesRef = useLatest(onChangeFiles)

    const clearRef = useRef(() => { })

    const renderInputEl = () => {
        return clearRef.current = render(<input
            ref={(el) => {
                el?.click()
            }}
            style={{ display: 'none' }}
            accept={accept}
            multiple={max > 1}
            max={max}
            onChange={(e) => {
                onChangeRef.current?.(e)
                const files = Array.from(e.target.files ?? [])
                onChangeFilesRef.current?.(files.slice(0, Number(max)))
                setTimeout(() => {
                    clearRef.current()
                }, 300)
            }}
            type="file"
        />)
    }

    const selectFile = useEventCallback(() => {
        clearRef.current()

        renderInputEl()
    })

    return {
        selectFile,
    }
}