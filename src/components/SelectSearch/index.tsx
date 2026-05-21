import api, { RegionDetailResponse } from "@/api";
import { toast } from "@/utils/toast";
import { Flex, Text } from "@chakra-ui/react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Loading from "@/components/Loading";

/**
 * 对外暴露的一些方法
 * @example
 * const areaSelectorRef = useRef<AreaSelectorStruct>(null)
 *
 * useEffect(() => {
 *  getUserInfo().then(({ countryId, areaId }) => {
 *    areaSelectorRef.current.setAddressIds(countryId, areaId)
 *  })
 * }, [])
 *
 * const handleSubmit = () => {
 *  const addressInfo = areaSelector.current?.submit()
 *
 *  console.log(addressInfo)
 * }
 *
 * <AreaSelector ref={areaSelectorRef} defaultAddressIds={["xxx", "xxxx"]}>
 */

export interface AreaSelectorStruct {
  /**
   * 校验并获取ids
   * @returns
   */
  submit: () =>
    | {
      country: { name: string; value: string };
      area: { name: string; value: string };
    }
    | false;
  /**
   * 动态设置ids， 用于异步情况下的 ids 设置
   * @param countryId
   * @param areaId
   * @returns
   */
  setAddressIds: (countryId?: string, areaId?: string) => void;
  /**
   * 直接获取当前组件内部的 ids 状态， 相比 submit 会少校验的步骤
   * @returns
   */
  getAddressIds: () => [countryId?: string, areaId?: string];

  getCountryName: () => string | undefined;
}

interface CountryOptionType {
  label: string | undefined;
  value: string | undefined;
  key: string | undefined;
  id?: number | undefined;
  parentId?: number | undefined;
  level?: number | undefined;
  name?: string | undefined;
  code?: string | undefined;
}

export interface Props extends PropsWithChildren {
  /** 是否显示label */
  showLabel?: boolean;
  /** 布局方向：垂直或者水平 */
  direction?: "column" | "row";
  /** 是否显示地区选项 */
  showArea?: boolean;

  /**
   * 当国家id变更时
   * @param id { string | undefined } 国家id, 当选择的国家为 “国家” 时， 会出现 id 为 `undefined` 情况
   * @returns
   */
  onCountryChange?: (id?: string) => void;
  /**
   * 当区域id变更时
   * @param id { string | undefined } 区域id, 当选择的区域为 “区域” 时， 会出现 id 为 `undefined` 情况
   * @returns
   */
  onAreaChange?: (id?: string) => void;
  /**
   * 当国家，或者区域变更时
   * @param countryId
   * @param areaId
   * @returns
   */
  onChange?: (countryId?: string, areaId?: string) => void;

  /**
   * 初始的 addressIds
   * @description 在组件第一次mounted 的时候才会去取用， 后续不会更新。
   * 如果想后续在外部更新组件内部的 ids， 请使用 {@link AreaSelectorStruct.setAddressIds|setAddressIds}
   */
  defaultAddressIds?: [countryId?: string, areaId?: string];
}

const formatId = (id: number | string | undefined) => {
  if (!id) return undefined;
  return id.toString();
};

/**
 * 地区选择器组件
 * @description 非受控组件
 */
export const SelectSearch = forwardRef(
  (
    {
      showLabel = true,
      showArea = true,
      direction = "column",
      defaultAddressIds,
      onChange,
      onCountryChange,
      onAreaChange,
    }: Props,
    ref
  ) => {
    const [countryId, setCountryId] = useState<string | undefined>(
      defaultAddressIds?.[0]
    );
    const [areaId, setAreaId] = useState<string | undefined>(
      defaultAddressIds?.[1]
    );
    const [countryOptions, setCountryOptions] = useState<CountryOptionType[]>(
      []
    );
    const [countriesShow, setCountriesShow] = useState<RegionDetailResponse[]>(
      []
    );
    const [isCountryOptionsFinished, setIsCountryOptionsFinished] =
      useState(false);
    const [isChanged, setChanged] = useState(false);
    const customStyles = {
      control: (provided: any) => ({
        ...provided,
        width: "230px",
        border: "1px solid gray",
        borderRadius: "36px",
      }),
    };

    const { data: countries = [], status } = useQuery({
      queryKey: ["countries"],
      queryFn: () => api.regions.getCountries(),
      refetchOnWindowFocus: false,
    });

    const moveLastItemToFirst = useCallback(function <T>(arr: T[]): T[] {
      if (!isChanged) {
        if (arr.length > 0) {
          const lastItem = arr.pop();
          if (lastItem !== undefined) {
            arr.unshift(lastItem);
          }
        }
        setChanged(true);
      }
      return arr;
    }, [isChanged]);

    const { i18n } = require('next-i18next');
    // 添加 state 来管理当前语言
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    // 添加 useEffect 监听语言变化
    useEffect(() => {
      const handleLanguageChanged = (lng: string) => {
        setCurrentLanguage(lng);
        console.log('Language changed to:', lng);
      };

      i18n.on('languageChanged', handleLanguageChanged);

      return () => {
        i18n.off('languageChanged', handleLanguageChanged);
      };
    }, [i18n, setCurrentLanguage]);

    useEffect(() => {
      if (status === "success") {
        setCountriesShow(moveLastItemToFirst(countries));
      }
    }, [countries, moveLastItemToFirst, status]);

    useEffect(() => {
      if (countriesShow.length > 0) {
        const option = countriesShow.map((item) => {
          return {
            ...item,
            label: currentLanguage === "zh" ? (item.name === '全球' ? '分布式' : item.name) : item.englishName,
            value: formatId(item.id),
            key: formatId(item.id),
          };
        });
        setCountryOptions(option);
        setIsCountryOptionsFinished(true);
      }
    }, [countriesShow, currentLanguage]);

    const { data: cities = [] } = useQuery({
      queryFn: () => api.regions.getProvinces(Number(countryId!)),
      queryKey: ["cities", countryId],
      enabled: typeof countryId !== "undefined",
      refetchOnWindowFocus: false,
    });

    useImperativeHandle(
      ref,
      () =>
      ({
        submit: () => {
          if (!countryId) {
            toast({
              title: "请选择国家",
            });
            return false;
          }
          if (!areaId) {
            toast({
              title: "请选择城市",
            });
            return false;
          }

          const country = countries.find(
            (v) => String(v.id || 0) === countryId
          );
          const city = cities.find((v) => String(v.id || 0) === areaId);

          if (!country || !city) {
            toast({
              title: "国家或者城市不存在",
            });
            return false;
          }

          return {
            country: { name: currentLanguage === "zh" ? country.name : country.englishName, value: country.id!.toString() },
            area: { name: city.name, value: city.id!.toString() },
          };
        },
        setAddressIds(countryId, areaId) {
          setCountryId(countryId);
          setAreaId(areaId);
        },
        getAddressIds() {
          return [countryId, areaId];
        },
        getCountryName() {
          const country = countries.find(
            (v) => String(v.id || 0) === countryId
          );
          return country ? country.name : "";
        },
      } as AreaSelectorStruct)
    );

    return (
      <Flex flexDirection={direction}>
        <Flex
          alignItems="center"
          mb={direction === "column" ? "16px" : ""}
          mr={direction === "row" ? "16px" : ""}
          py="8px"
        >
          {showLabel && (
            <Text mr="18px" fontSize="14px" color="#ADADAD">
              国家
            </Text>
          )}
          {!isCountryOptionsFinished ? (
            <Loading></Loading>
          ) : (
            <Select
              styles={customStyles}
              placeholder={currentLanguage === "zh" ? "国家" : "Country"}
              isSearchable
              value={countryOptions.find((v) => {
                return v.value === defaultAddressIds?.[0];
              })}
              options={countryOptions}
              onChange={(v: CountryOptionType) => {
                const localCountryId = formatId(v?.id);
                setCountryId(localCountryId);
                setAreaId(undefined);
                onCountryChange?.(localCountryId);
                onChange?.(localCountryId, undefined);
              }}
            />
          )}
        </Flex>
        {showArea && (
          <Flex alignItems="center">
            {showLabel && (
              <Text mr="18px" fontSize="14px" color="#ADADAD">
                城市
              </Text>
            )}
            <Select
              styles={customStyles}
              placeholder="城市"
              options={cities.map((item) => {
                return {
                  ...item,
                  label: item.name,
                  value: formatId(item.id),
                  key: formatId(item.id),
                };
              })}
              onChange={(v: CountryOptionType) => {
                const localAreaId = formatId(v?.id);
                setAreaId(localAreaId);
                onAreaChange?.(localAreaId);
                onChange?.(countryId!, localAreaId);
              }}
            />
          </Flex>
        )}
      </Flex>
    );
  }
);

SelectSearch.displayName = "SelectSearch";
