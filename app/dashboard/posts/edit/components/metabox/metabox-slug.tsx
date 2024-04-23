'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { kebabCase, debounce } from 'lodash'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { usePostForm } from '../post-form-provider'

export function MetaboxSlug() {
  const { t } = useTranslation()
  const { form } = usePostForm()
  const { control, watch, setValue } = form

  const title: string = watch('title')
  const slug: string = watch('slug')

  const debounceSetValue = React.useCallback(
    debounce((value: string) => setValue('slug', value), 1000),
    []
  )

  React.useEffect(() => {
    if (!slug) setValue('slug', kebabCase(title))
  }, [setValue, slug, title])

  React.useEffect(() => {
    if (slug) debounceSetValue(kebabCase(slug))
  }, [debounceSetValue, slug])

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>{t('PostMetabox.slug')}</AccordionTrigger>
        <AccordionContent className="px-1 py-1 pb-4">
          <FormField
            control={control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t('Input.please_enter_your_text')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
