import React from 'react';
import {InlineShareButtons} from 'sharethis-reactjs';
const ShareButtons = ({ url, title }) => {
    const result = 12;
    return (
        <div className="share-buttons">
            <InlineShareButtons config={{ alignment: 'center', enabled: true, language: 'ru',       
            networks: [ 'twitter', 'vk','odnoklassniki','whatsapp','whatsapp',],
            url: 'https://van.iatrpg.ru/', title: 'Онлайн тестирования по разным профессиям'}}></InlineShareButtons>
        </div>
    );
};
export default ShareButtons;    