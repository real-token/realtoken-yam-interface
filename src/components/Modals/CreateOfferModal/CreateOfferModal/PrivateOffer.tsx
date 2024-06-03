import { UseFormReturnType } from '@mantine/form';
import { Checkbox, TextInput } from '@mantine/core';
import { SellFormValues } from '../CreateOfferModal';
import { useTranslation } from 'react-i18next';

interface PrivateOfferProps {
    form: UseFormReturnType<SellFormValues>;
}
export const PrivateOffer = ({ form }: PrivateOfferProps) => {

    const { getInputProps, values } = form;

    const { t } = useTranslation('modals', { keyPrefix: 'sell' });
 
    return(
        <>
        <Checkbox
            mt={'md'}
            label={t('checkboxLabelPrivateOffre')}
            {...getInputProps('isPrivateOffer', { type: 'checkbox' })}
        />
        {form.values.isPrivateOffer ? (
            <TextInput
                label={t('labelPrivateBuyerAddress')}
                placeholder={t('placeholderOfferPrivatBuyerAddress')}
                required={values.isPrivateOffer}
                disabled={!values.isPrivateOffer}
                error={"Impossible de créér une offre à destination de votre address"}
                {...getInputProps('buyerAddress')}
            />
        ): undefined}
        </>
    )
}