import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const pid = `PLJ0_dUpwgnHFavHZ7uqnEzrNDRuN07aRI`;
	const num = 10;
	const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResult=${num}`;
	const { data } = await axios.get(resultURL);
	return data.data.items;
};
export const useYoutubeQuery = () => {
	return useQuery(['YoutubeData'], fetchYoutube);
};
