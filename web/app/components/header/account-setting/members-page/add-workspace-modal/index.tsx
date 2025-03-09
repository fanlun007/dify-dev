'use client'
import { useCallback, useState } from 'react'
import { useContext } from 'use-context-selector'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import s from './index.module.css'
import cn from '@/utils/classnames'
import Modal from '@/app/components/base/modal'
import Button from '@/app/components/base/button'
import Input from '@/app/components/base/input'
import { ToastContext } from '@/app/components/base/toast'

type IAddWorkspaceModalProps = {
  onCancel: () => void
  onConfirm: (name: string) => void
}

const AddWorkspaceModal = ({
  onCancel,
  onConfirm,
}: IAddWorkspaceModalProps) => {
  const { t } = useTranslation()
  const [name, setName] = useState<string>('')
  const { notify } = useContext(ToastContext)

  const handleConfirm = useCallback(() => {
    if (!name.trim()) {
      notify({ type: 'error', message: t('common.errorMsg.fieldRequired', { field: t('common.workspace.name') }) })
      return
    }
    onConfirm(name)
  }, [name, notify, onConfirm, t])

  return (
    <div className={cn(s.wrap)}>
      <Modal overflowVisible isShow onClose={() => { }} className={cn(s.modal)}>
        <div className='flex justify-between mb-2'>
          <div className='text-xl font-semibold text-gray-900'>{t('common.workspace.add')}</div>
          <XMarkIcon className='w-4 h-4 cursor-pointer' onClick={onCancel} />
        </div>
        <div className='mb-3 text-[13px] text-gray-500'>{t('common.workspace.addTip')}</div>

        <div>
          <div className='mb-2 text-sm font-medium text-gray-900'>{t('common.workspace.name')}</div>
          <div className='mb-8'>
            <Input
              className='w-full'
              placeholder={t('common.workspace.namePlaceholder') || ''}
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <Button
            tabIndex={0}
            className='w-full'
            onClick={handleConfirm}
            disabled={!name.trim()}
            variant='primary'
          >
            {t('common.operation.confirm')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default AddWorkspaceModal
