import React from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilValueLoadable } from 'recoil'
import { categoriesData } from '../../store/common'
import Dropdown from './Dropdown'
import ColorChip from './ColorChip'

const ColorDropdown = ({
  style,
  innerStyle,
  color,
  setColor,
  setCategory,
  maxHeight,
}) => {
  const defaultStyle = style || {
    container:
      'rounded-md border border-green-900 text-green-900 mb-4 bg-gray-50',
    preview: 'flex cursor-pointer items-center px-2 border-green-900 font-bold',
    open: 'overflow-y-auto',
  }

  const defaultInnerStyle = {
    container: 'text-green-900 text-xs border-t',
    preview: 'flex cursor-pointer items-center px-2 border-green-900',
    open: 'overflow-y-auto',
  }

  const email = useSession().data.user.email
  const categories = useRecoilValueLoadable(categoriesData(email))
  const defaultColor =
    categories.state === 'hasValue' && categories.contents[0].userColors[0]

  const renderPreview = () => (
    <div className="flex items-center">
      <ColorChip hex={color?.color?.hex || defaultColor?.color?.hex} />
      <p>{color?.tag || defaultColor.tag}</p>
    </div>
  )

  return (
    <Dropdown
      style={style || defaultStyle}
      preview={renderPreview()}
      fullHeight="210px"
      maxHeight={maxHeight || '34px'}
    >
      {categories.state === 'hasValue' &&
        categories.contents.map((category, i) => (
          <Dropdown
            key={i}
            style={innerStyle || defaultInnerStyle}
            preview={category.categoryName}
            fullHeight="150px"
            maxHeight={maxHeight || '34px'}
          >
            <div className="cursor-pointer">
              {category.userColors.map((colorInfo, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setColor({ ...colorInfo, userCategory: category })
                  }
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <ColorChip hex={colorInfo.color.hex} />
                  <p>{colorInfo.tag}</p>
                </div>
              ))}
            </div>
          </Dropdown>
        ))}
    </Dropdown>
  )
}

export default ColorDropdown
